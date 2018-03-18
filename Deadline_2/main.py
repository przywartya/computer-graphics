import PIL
import numpy as np
import tkinter as tk
import matplotlib.pyplot as plt

import glib


class WindowInter:
    average_dithering_k, ordered_dithering_k, ordered_dithering_n = None, None, None
    uniform_quantization_kr, uniform_quantization_kg, uniform_quantization_kb = None, None, None
    median_cut_quantization_k = None

    def __init__(self):
        self.window = None
        self.color = self.prepare_color()
        self.grey = glib.my_grayscale(self.color)
        self.prepare_window()
        self.window.mainloop()

    def prepare_color(self):
        file = file_dialog()
        raw = PIL.Image.open(file)
        img = np.asarray(raw)
        img.setflags(write=True)
        return img

    def prepare_window(self):
        self.window = tk.Tk()
        self.window.title("Computer Graphics 1")
        self.window.geometry("400x400")
        self.prepare_buttons()
        self.prepare_inputs()

    def prepare_buttons(self):
        panel = tk.Label(self.window)

        button = tk.Button(panel, text="Ordered Dithering", command=self.ordered_dithering)
        button.pack()
        button = tk.Button(panel, text="Average Dithering", command=self.average_dithering)
        button.pack()
        button = tk.Button(panel, text="Uniform Quantization", command=self.uniform_quantization)
        button.pack()
        button = tk.Button(panel, text="Median-Cut Quantization", command=self.median_cut_quantization)
        button.pack()

        panel.pack(side='bottom')

    def prepare_inputs(self):
        panel = tk.Label(self.window)

        tk.Label(panel, text="Ordered dithering k: ").grid(row=0, column=0)
        self.ordered_dithering_k = tk.Entry(panel, bd=1, width=3)
        self.ordered_dithering_k.grid(row=0, column=1)

        tk.Label(panel, text="Size of dither matrix n: ").grid(row=1, column=0)
        self.ordered_dithering_n = tk.Entry(panel, bd=1, width=3)
        self.ordered_dithering_n.grid(row=1, column=1)

        tk.Label(panel, text="Average dithering k: ").grid(row=2, column=0)
        self.average_dithering_k = tk.Entry(panel, bd=1, width=3)
        self.average_dithering_k.grid(row=2, column=1)

        tk.Label(panel, text="Uniform quantization kr, kg, kb: ").grid(row=3, column=0)
        self.uniform_quantization_kr = tk.Entry(panel, bd=1, width=3)
        self.uniform_quantization_kr.grid(row=3, column=1)
        self.uniform_quantization_kg = tk.Entry(panel, bd=1, width=3)
        self.uniform_quantization_kg.grid(row=3, column=2)
        self.uniform_quantization_kb = tk.Entry(panel, bd=1, width=3)
        self.uniform_quantization_kb.grid(row=3, column=3)

        tk.Label(panel, text="Median-Cut quantization k: ").grid(row=4, column=0)
        self.median_cut_quantization_k = tk.Entry(panel, bd=1, width=3)
        self.median_cut_quantization_k.grid(row=4, column=1)

        panel.pack(side='top')

    def average_dithering(self):
        k = int(self.average_dithering_k.get())
        height, width = self.grey.shape
        result = glib.average_dithering(self.grey, k)
        show_images(self.grey, result, height, width, cmap='gray')

    def ordered_dithering(self):
        k = int(self.ordered_dithering_k.get())
        n = int(self.ordered_dithering_n.get())
        height, width = self.grey.shape
        result = glib.ordered_dithering(self.grey, k, n)
        show_images(self.grey, result, height, width, cmap='gray')

    def uniform_quantization(self):
        kr = int(self.uniform_quantization_kr.get())
        kg = int(self.uniform_quantization_kg.get())
        kb = int(self.uniform_quantization_kb.get())
        height, width, _ = self.color.shape
        result = glib.uniform_quantization(self.color, kr, kg, kb)
        show_images(self.color, result, height, width, cmap=None)

    def median_cut_quantization(self):
        k = int(self.median_cut_quantization_k.get())
        height, width, _ = self.color.shape
        result = glib.median_cut_quantization(self.color, k)
        show_images(self.color, result, height, width, cmap=None)


def file_dialog():
    return tk.filedialog.askopenfilename(filetypes=(("jpeg files", ".jpg"), ("all files", "*.*")))


def show_images(img1, img2, height, width, cmap):
    dpi = 80
    figsize = width / float(dpi), height / float(dpi)
    fig = plt.figure(figsize=figsize)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.imshow(img1, cmap=cmap)
    fig = plt.figure(figsize=figsize)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.imshow(img2, cmap=cmap)
    plt.show()


if __name__ == "__main__":
    WindowInter()
