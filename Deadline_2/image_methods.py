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


def random_dithering(img, n):
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
