import numpy as np
import matplotlib.pyplot as plt
from operator import itemgetter


def my_grayscale(image):
    grey = np.zeros((image.shape[0], image.shape[1]), dtype=np.uint8)
    for row_index in range(len(image)):
        for col_index in range(len(image[row_index])):
            grey[row_index][col_index] = weighted_average(image[row_index][col_index]) // 3
    return grey


def weighted_average(pixel):
    return 0.299*pixel[0] + 0.587*pixel[1] + 0.114*pixel[2]


def average_dithering(image, k):
    if k not in [2, 4, 8, 16]:
        raise Exception("Available gray levels: 2, 4, 8, 16.")
    image = image.copy()
    threshold = np.mean(image)
    constant = int(2 * threshold / k)
    m = [0] * (k-1)
    tmp = 0
    for i in range(k-1):
        tmp = tmp + constant
        m[i] = tmp
    for row_index in range(len(image)):
        for col_index in range(len(image[row_index])):
            pixel_value = image[row_index][col_index]
            for i in range(k-1):
                if pixel_value < m[i]:
                    image[row_index][col_index] = i
                    break
            if pixel_value >= m[k-2]:
                image[row_index][col_index] = k-1
    return image


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
    if k not in [2, 4, 8, 16]:
        raise Exception("Available gray levels: 2, 4, 8, 16.")
    if n not in [2, 3, 4, 6]:
        raise Exception("Available sizes of dither matrices are: 2, 3, 4, 6.")
    image = image.copy()
    bayer_matrix = my_bayer_matrix(n)
    for row_index in range(len(image)):
        for col_index in range(len(image[row_index])):
            pixel_value = image[row_index][col_index]
            threshold = bayer_matrix[row_index % n, col_index % n]
            constant = int(2 * threshold / k)
            m = [0] * (k - 1)
            tmp = 0
            for i in range(k-1):
                tmp = tmp + constant
                m[i] = tmp
            for i in range(k-1):
                if pixel_value < m[i]:
                    image[row_index][col_index] = i
                    break
            if pixel_value >= m[k-2]:
                image[row_index][col_index] = k-1
    return image


def handle_channel(ch, k, row, col):
    constant = int(255 / k)
    m = [0] * (k - 1)
    tmp = 0
    for i in range(k - 1):
        tmp = tmp + constant
        m[i] = tmp
    pixel_value = ch[row][col]
    for i in range(k - 1):
        if pixel_value < m[i]:
            if i == 0:
                ch[row][col] = 0
            else:
                ch[row][col] = m[i]
            break
    if pixel_value >= m[k - 2]:
        ch[row][col] = 255


def uniform_quantization(img, kr, kg, kb):
    result = img.copy()
    r, g, b = result[:, :, 0], result[:, :, 1], result[:, :, 2]
    for row_index in range(len(r)):
        for col_index in range(len(r[row_index])):
            handle_channel(r, kr, row_index, col_index)
            handle_channel(g, kg, row_index, col_index)
            handle_channel(b, kb, row_index, col_index)
    return result


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
        result = sorted(self.colors, key=itemgetter(channel))

        # Find median
        med_idx = len(self.colors) // 2

        # Create splits
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


def get_median_cut_color_pallete(img, k):
    flat_array = []
    for row in img:
        for pixel in row:
            flat_array.append(tuple(pixel.tolist()))
    cubes = [ColorCube(*flat_array)]
    max_cube, channel = 0, 0
    while len(cubes) < k:
        global_max_size = 0
        for index, cube in enumerate(cubes):
            channel, size = cube.channel_with_max_range
            if size > global_max_size:
                global_max_size = size
                max_cube = index
        split_box = cubes[max_cube]
        cube_1, cube_2 = split_box.split(channel)
        cubes = cubes[:max_cube] + [cube_1, cube_2] + cubes[max_cube+1:]
    return [c.average for c in cubes]


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
    return result


def handle_channels_by_pallete(ch, m, k, row, col):
    pixel_value = ch[row][col]
    for i in range(k - 1):
        if pixel_value < m[i]:
            ch[row][col] = m[i]
            return
    ch[row][col] = m[k - 1]
