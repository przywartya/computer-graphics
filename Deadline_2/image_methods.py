import numpy as np
from PIL import Image
from random import randint


def resize_image(img):
    wpercent = (300/float(img.size[0]))
    hsize = int((float(img.size[1])*float(wpercent)))
    img = img.resize((300, hsize), Image.ANTIALIAS)
    return img


def to_tkimage(img):
    return Image.fromarray(np.uint8(img))


def convert_to_n_gray_levels(img, n):
    conversion_table = {2: 128, 4: 64, 8: 32, 16: 16, 32: 8, 64: 4, 128: 2}
    np_shape = img.shape
    img = np.ndarray.flatten(img)/conversion_table[n]
    round_down = np.vectorize(lambda i: int(i))
    img = round_down(img)
    return np.array(img).reshape(np_shape)


def average_dithering(img, n=4):
    np_shape = img.shape
    img = np.ndarray.flatten(img)
    threshold = int(np.mean(img))
    for pixel in range(0, img.shape[0]):
        if n == 2:
            if img[pixel] > threshold:
                img[pixel] = 1
            else:
                img[pixel] = 0
        elif n == 4:
            threshold1 = max(0, threshold - int(threshold/2))
            threshold2 = threshold
            threshold3 = min(255, threshold + int(threshold/2))
            if img[pixel] < threshold1:
                img[pixel] = 0
            elif threshold2 > img[pixel] >= threshold1:
                img[pixel] = 1
            elif threshold3 > img[pixel] >= threshold2:
                img[pixel] = 2
            elif img[pixel] >= threshold3:
                img[pixel] = 3
        else:
            raise Exception("Only n=2 or n=4 supported.")
    return np.array(img).reshape(np_shape)


def random_dithering_a(img, n=4):
    np_shape = img.shape
    img = np.ndarray.flatten(img)
    for pixel in range(0, img.shape[0]):
        threshold = int(randint(1, 255))
        if n == 2:
            if img[pixel] > threshold:
                img[pixel] = 1
            else:
                img[pixel] = 0
        elif n == 4:
            threshold1 = max(0, threshold - int(threshold/2))
            threshold2 = threshold
            threshold3 = min(255, threshold + int(threshold/2))
            if img[pixel] < threshold1:
                img[pixel] = 0
            elif threshold2 > img[pixel] >= threshold1:
                img[pixel] = 1
            elif threshold3 > img[pixel] >= threshold2:
                img[pixel] = 2
            elif img[pixel] >= threshold3:
                img[pixel] = 3
        else:
            raise Exception("Only n=2 or n=4 supported.")
    return np.array(img).reshape(np_shape)


def random_dithering(img, n):
    # I can't find how to extend it to multiple levels, it does not work as good as the above random_dither_a.
    conversion_table = {2: 128, 4: 64, 8: 32, 16: 16, 32: 8, 64: 4, 128: 2}
    np_shape = img.shape
    img = np.ndarray.flatten(img)
    img = np.ndarray.flatten(img)/conversion_table[n]
    round_down = np.vectorize(lambda i: int(i))
    img = round_down(img)
    for pixel in range(0, img.shape[0]):
        random_value = randint(0, n-1)
        if img[pixel] > random_value:
            img[pixel] = img[pixel] + 1
    return np.array(img).reshape(np_shape)
