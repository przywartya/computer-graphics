import numpy as np
from operator import itemgetter


def my_grayscale(image):
    grey = np.zeros((image.shape[0], image.shape[1]), dtype=np.uint8)
    for row_index in range(len(image)):
        for col_index in range(len(image[row_index])):
            grey[row_index][col_index] = weighted_average(image[row_index][col_index])
    return grey


def weighted_average(pixel):
    return 0.299*pixel[0] + 0.587*pixel[1] + 0.114*pixel[2]


# def average_dithering(image, k):
#     if k not in [2, 4, 8, 16]:
#         raise Exception("Available gray levels: 2, 4, 8, 16.")
#     image = image.copy()
#     threshold = np.mean(image)
#     constant = int(2 * threshold / k)
#     m = [0] * (k-1)
#     tmp = 0
#     for i in range(k-1):
#         tmp = tmp + constant
#         m[i] = tmp
#     print("Levels: (for average: {})".format(threshold))
#     print(m)
#     for row_index in range(len(image)):
#         for col_index in range(len(image[row_index])):
#             pixel_value = image[row_index][col_index]
#             for i in range(k-1):
#                 if pixel_value < m[i]:
#                     image[row_index][col_index] = i
#                     break
#             if pixel_value >= m[k-2]:
#                 image[row_index][col_index] = k-1
#     return image


def translate_0_1_to_0_255(n):
    return [float(i * (255 / (n - 1))) for i in range(n)]


def get_index_in_translation_0_1(val, ranges):
    for i in range(len(ranges)):
        if ranges[i] >= val:
            return i - 1
    return len(ranges) - 1


def average_dithering_n(img, k):
    shape = img.shape
    img_flatten = np.ndarray.flatten(img)
    ranges = [float(i * (255 / (k - 1))) for i in range(k)]
    means = []
    for i, j in zip(ranges, ranges[1:]):
        new_element = img_flatten[(i < img_flatten) & (img_flatten < j)]
        means.append(new_element.mean())
    print(means)
    for pixel in range(0, img_flatten.shape[0]):
        new_idx = get_index_in_translation_0_1(img_flatten[pixel], means) + 1
        img_flatten[pixel] = ranges[new_idx]
    result = np.array(img_flatten).reshape(shape)
    return result


def dither(n):
    if n == 2:
        return np.array([[1, 3], [4, 2]])
    if n == 3:
        return np.array([[3, 7, 4], [6, 1, 9], [2, 8, 5]])
    return np.vstack((
        np.hstack(((4*(dither(n/2))-1) + 1, (4*(dither(n/2))-1) + 3)),
        np.hstack(((4*(dither(n/2))-1) + 4, (4*(dither(n/2))-1) + 2)),
    ))


def my_bayer_matrix(n):
    bayer_matrix = (1/((n * n) + 1)) * dither(n) * 255
    return bayer_matrix.astype(dtype=np.uint8)


def ordered_dithering(image, k, n):
    if k not in [2, 4, 8, 16, 32]:
        raise Exception("Available gray levels: 2, 4, 8, 16.")
    if n not in [2, 3, 4, 6, 8, 12, 16]:
        raise Exception("Available sizes of dither matrices are: 2, 3, 4, 6.")
    image = image.copy()
    bayer_matrix = my_bayer_matrix(n)
    print("Bayer matrix:")
    print(bayer_matrix)
    for row_index in range(len(image)):
        for col_index in range(len(image[row_index])):
            pixel_value = image[row_index][col_index]
            threshold = bayer_matrix[row_index % n, col_index % n]
            constant = int(threshold / (k-1))
            m = [0] * (k - 1)
            tmp = constant
            for i in range(k-1):
                tmp = tmp + (255 / (k-1))
                m[i] = tmp
            for i in range(k-1):
                if pixel_value < m[i]:
                    image[row_index][col_index] = i
                    break
            if pixel_value >= m[k-2]:
                image[row_index][col_index] = k-1
    return image


def uniform_quantization(img, kr, kg, kb):
    result = img.copy()
    r, g, b = result[:, :, 0], result[:, :, 1], result[:, :, 2]
    for row_index in range(len(r)):
        for col_index in range(len(r[row_index])):
            handle_channel(r, kr, row_index, col_index)
            handle_channel(g, kg, row_index, col_index)
            handle_channel(b, kb, row_index, col_index)
    return result


def handle_channel(ch, k, row, col):
    constant = int(255 / k)
    m = [0] * (k+1)
    tmp = 0
    for i in range(1, k+1):
        tmp = tmp + constant
        m[i] = tmp
    l = [(i + j) / 2 for i, j in zip(m, m[1:])]
    pixel_value = ch[row][col]
    for i in range(k - 1):
        if pixel_value < m[i]:
            ch[row][col] = l[i]
            break
    if pixel_value >= m[-1]:
        ch[row][col] = l[-1]


def median_cut_quantization(img, k):
    pallete = get_median_cut_color_pallete(img, k)
    mr = [pixel[0] for pixel in pallete]
    mg = [pixel[1] for pixel in pallete]
    mb = [pixel[2] for pixel in pallete]
    result = img.copy()
    r, g, b = result[:, :, 0], result[:, :, 1], result[:, :, 2]
    for row_index in range(len(r)):
        for col_index in range(len(r[row_index])):
            handle_channels_by_pallete(r, mr, k, row_index, col_index)
            handle_channels_by_pallete(g, mg, k, row_index, col_index)
            handle_channels_by_pallete(b, mb, k, row_index, col_index)
    # R [41  83 113 125 142 160 181 215]
    # G [35  73  99 112 128 148 168 221]
    # B [27  58  82  94 111 132 151 226]
    # print(np.unique(r), np.unique(g), np.unique(b))
    return result


def get_median_cut_color_pallete(img, k):
    flat_array = []
    for row in img:
        for pixel in row:
            flat_array.append(tuple(pixel.tolist()))
    cubes = [ColorCube(*flat_array)]
    max_cube, channel = 0, 0
    while len(cubes) < k:
        # Repeat the process on both
        # buckets, giving you 4 buckets, then
        # repeat on all 4 buckets, giving
        # you 8 buckets, then repeat
        # on all 8, giving you 16 buckets.
        global_max_size = 0
        for index, cube in enumerate(cubes):
            channel, size = cube.channel_with_max_range
            if size > global_max_size:
                global_max_size = size
                max_cube = index
        split_box = cubes[max_cube]
        cube_1, cube_2 = split_box.split(channel)
        cubes = cubes[:max_cube] + [cube_1, cube_2] + cubes[max_cube+1:]
    # dla k = 8
    # [(41, 35, 27), (83, 73, 58), (113, 99, 82),
    # (125, 112, 94), (142, 128, 111), (160, 148, 132),
    # (181, 168, 151), (215, 221, 226)]
    # Average the pixels in each bucket and you have a palette of 16 colors.
    return [c.average for c in cubes]


class ColorCube:
    def __init__(self, *colors):
        self.colors = colors or []

    @property
    def channel_with_max_range(self):
        return self.get_channel_with_biggest_range()

    def get_channel_with_biggest_range(self):
        r = [pixel[0] for pixel in self.colors]
        g = [pixel[1] for pixel in self.colors]
        b = [pixel[2] for pixel in self.colors]
        r_range = np.amax(r) - np.amin(r)
        g_range = np.amax(g) - np.amin(g)
        b_range = np.amax(b) - np.amin(b)
        biggest_range = max(r_range, b_range, g_range)
        if biggest_range == r_range:
            return 0, biggest_range
        if biggest_range == g_range:
            return 1, biggest_range
        if biggest_range == b_range:
            return 2, biggest_range

    def split(self, channel):
        # sort all the pixels in the image by the channel with biggest range
        result = sorted(self.colors, key=itemgetter(channel))

        # Find median
        med_idx = len(self.colors) // 2

        # Create splits (move the upper half of the pixels into a new bucket).
        return (
            ColorCube(*result[:med_idx]),
            ColorCube(*result[med_idx:])
        )

    @property
    def average(self):
        r = np.average([pixel[0] for pixel in self.colors])
        g = np.average([pixel[1] for pixel in self.colors])
        b = np.average([pixel[2] for pixel in self.colors])
        return int(r), int(g), int(b)


def handle_channels_by_pallete(ch, m, k, row, col):
    pixel_value = ch[row][col]
    for i in range(k - 1):
        if pixel_value < m[i]:
            ch[row][col] = m[i]
            return
    ch[row][col] = m[k - 1]
