import tkinter as tk
from PIL import ImageTk, Image
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import numpy as np

FILE = '../friend.jpg'


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


class WindowInter:
    def __init__(self):
        # self.window = tk.Tk()
        # self.window.title("Computer Graphics 1")
        # self.window.geometry("600x600")
        # self.window.configure(background='grey')
        raw = resize_image(Image.open(FILE))
        img = np.asarray(raw)
        img.setflags(write=True)
        grayscale = img[:, :, 0]
        self.top = grayscale
        self.bottom = convert_to_n_gray_levels(grayscale, 4)
        self.show_images()

    def show_images(self):
        fig = plt.figure(figsize=(10, 10))
        ax1 = fig.add_subplot(2, 1, 1)
        ax1.imshow(self.top, cmap='gray')
        ax2 = fig.add_subplot(2, 1, 2)
        ax2.imshow(self.bottom, cmap='gray')
        plt.show()


def main():
    WindowInter()


main()
