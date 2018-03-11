import tkinter as tk
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
import image_methods as m

FILE = '../friend.jpg'


class WindowInter:
    def __init__(self):
        self.top, self.bottom = None, None
        # self.window = tk.Tk()
        # self.window.title("Computer Graphics 1")
        # self.window.geometry("600x600")
        # self.window.configure(background='grey')
        raw = m.resize_image(Image.open(FILE))
        img = np.asarray(raw)
        img.setflags(write=True)
        grayscale = img[:, :, 0]
        # self.top = grayscale
        # for n=2 binary image
        # for n=4 four gray levels available: black, gray 33%, gray 66% and white
        # self.bottom = m.convert_to_n_gray_levels(grayscale, 2)
        # self.bottom = m.random_dithering(grayscale, 4)
        self.top = m.random_dithering(grayscale, 2)
        self.bottom = m.random_dithering_a(grayscale, 2)
        self.show_images()

    def show_images(self):
        fig = plt.figure(figsize=(10, 10))
        ax1 = fig.add_subplot(2, 1, 1)
        ax1.imshow(self.top, cmap='gray')
        if self.bottom is not None:
            ax2 = fig.add_subplot(2, 1, 2)
            ax2.imshow(self.bottom, cmap='gray')
        plt.show()


def main():
    WindowInter()


main()
