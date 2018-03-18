import tkinter as tk
import matplotlib.image as mpimg
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
import image_methods as m


def file_dialog():
    from tkinter.filedialog import askopenfilename
    path = askopenfilename(filetypes=(("jpeg files",".jpg"),("all files","*.*")))
    return path


# FILE = '../eye.jpg'
# for n=2 binary image
# for n=4 four gray levels available: black, gray 33%, gray 66% and white
# self.bottom = m.convert_to_n_gray_levels(grayscale, 2)
# self.bottom = m.random_dithering(grayscale, 4)
# self.top = m.my_ordered_dithering(grayscale, 2, 4)
# self.bottom = m.my_ordered_dithering(grayscale, 4, 4)


class WindowInter:
    def __init__(self):
        self.window, self.top, self.bottom = None, None, None
        self.prepare_window()
        self.prepare_image()
        self.window.mainloop()

    def prepare_window(self):
        self.window = tk.Tk()
        self.window.title("Computer Graphics 1")
        self.window.geometry("300x300")
        self.prepare_buttons()

    def prepare_buttons(self):
        panel = tk.Label(self.window)
        button = tk.Button(panel, text="Average dithering", command=self.average_dithering)
        button.pack()
        panel.pack(side='top')

    def prepare_image(self):
        file = file_dialog()
        raw = Image.open(file)
        img = np.asarray(raw)
        img.setflags(write=True)
        self.top = m.my_grayscale(img)

    def average_dithering(self):
        self.bottom = m.average_dithering(self.top)
        self.show_images()

    def show_images(self):
        fig = plt.figure(figsize=(10, 10))
        ax1 = fig.add_subplot(2, 1, 1)
        ax1.imshow(self.top, cmap='gray')
        if self.bottom is not None:
            ax2 = fig.add_subplot(2, 1, 2)
            ax2.imshow(self.bottom, cmap='gray')
        plt.show()


if __name__ == "__main__":
    WindowInter()
