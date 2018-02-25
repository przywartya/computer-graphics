import tkinter as tk
from PIL import ImageTk, Image
import numpy as np


filters_database = {
    'blur': np.array((
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1]), dtype="int"),
    'gaussian': np.array((
        [0, 1, 2, 1, 0],
        [1, 4, 8, 4, 1],
        [2, 8, 16, 8, 2],
        [1, 4, 8, 4, 1],
        [0, 1, 2, 1, 0]), dtype="int"),
    'sharpen1': np.array((
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0]), dtype="int"),
    'sharpen2': np.array((
        [-1, -1, -1],
        [-1, 9, -1],
        [-1, -1, -1]), dtype="int"),
    'Hedgedetect': np.array((
        [0, -1, 0],
        [0, 1, 0],
        [0, 0, 0]), dtype="int"),
    'Vedgedetect': np.array((
        [0, 0, 0],
        [-1, 1, 0],
        [0, 0, 0]), dtype="int"),
    'Dedgedetect': np.array((
        [-1, 0, 0],
        [0, 1, 0],
        [0, 0, 0]), dtype="int"),
    'laplacian1': np.array((
        [0, -1, 0],
        [-1, 4, -1],
        [0, -1, 0]), dtype="int"),
    'laplacian2': np.array((
        [-1, -1, -1],
        [-1, 8, -1],
        [-1, -1, -1]), dtype="int"),
    'eastemboss': np.array((
        [-1, 0, 1],
        [-1, 1, 1],
        [-1, 0, 1]), dtype="int"),
    'southemboss': np.array((
        [-1, -1, -1],
        [0, 1, 0],
        [1, 1, 1]), dtype="int"),
    'southeastemboss': np.array((
        [-1, -1, 0],
        [-1, 1, 1],
        [0, 1, 1]), dtype="int"),

}

SECOND_PART = False


class WindowInter:
    entries = []
    top, bottom, mode, kernel_choice = None, None, None, None

    def __init__(self):
        self.window = tk.Tk()
        self.window.title("Computer Graphics 1")
        self.window.geometry("300x300")
        self.window.configure(background='grey')
        self.panel3 = tk.Label(self.window)
        self.panel3.pack(side="left")

    def show_buttons(self):
        panel4 = tk.Label(self.window)
        button3 = tk.Button(panel4, text="3x3", command=self.button3)
        button5 = tk.Button(panel4, text="5x5", command=self.button5)
        button7 = tk.Button(panel4, text="7x7", command=self.button7)
        button9 = tk.Button(panel4, text="9x9", command=self.button9)
        button25 = tk.Button(panel4, text="25x25", command=self.button25)
        button3.pack()
        button5.pack()
        button7.pack()
        button9.pack()
        button25.pack()
        panel4.pack(side="left")

    def button3(self):
        self.kernel_choice = 3
        self.create_grid()

    def button5(self):
        self.kernel_choice = 5
        self.create_grid()

    def button7(self):
        self.kernel_choice = 7
        self.create_grid()

    def button9(self):
        self.kernel_choice = 9
        self.create_grid()

    def button25(self):
        self.kernel_choice = 25
        self.create_grid()

    def create_grid(self):
        self.entries = []
        for widget in self.panel3.winfo_children():
            widget.destroy()
        rows = 0
        while rows < self.kernel_choice + 1:
            self.panel3.rowconfigure(rows, weight=1)
            self.panel3.columnconfigure(rows, weight=1)
            rows += 1
        for i in range(0, self.kernel_choice):
            for j in range(0, self.kernel_choice):
                entry_widget = tk.Entry(self.panel3, width=2)
                entry_widget.grid(row=i, column=j)
                self.entries.append(entry_widget)
        submit_button = tk.Button(self.panel3, command=self.button)
        submit_button.grid(row=self.kernel_choice + 1)

    def show_tk_image(self, top):
        self.top = top
        self.show_buttons()
        self.window.mainloop()

    def show_images(self, kernel):
        window = tk.Tk()
        window.title("Computer Graphics 1")
        window.geometry("600x400")
        window.configure(background='grey')

        filtered = convolve(self.top, kernel)
        raw = to_tkimage(self.top)
        filtered = to_tkimage(filtered)

        tkimg1 = ImageTk.PhotoImage(raw, master=window)
        tkimg2 = ImageTk.PhotoImage(filtered, master=window)
        panel1 = tk.Label(window, image=tkimg1)
        panel2 = tk.Label(window, image=tkimg2)
        panel1.pack(side="top", fill="both", expand="yes")
        panel2.pack(side="bottom", fill="both", expand="yes")
        window.mainloop()

    def button(self):
        # self.show_images()
        input_numbers = [int(entry.get() or 0) for entry in self.entries]
        arr = np.array(input_numbers)
        arr = arr.reshape((self.kernel_choice, self.kernel_choice))
        self.show_images(arr)


def resize_image(img):
    wpercent = (300/float(img.size[0]))
    hsize = int((float(img.size[1])*float(wpercent)))
    img = img.resize((300, hsize), Image.ANTIALIAS)
    return img


def set_brightness(img, value):
    for i in range(0, img.shape[0]):
        for j in range(0, img.shape[1]):
            current_value = img[i, j]
            img[i, j] = min(255, current_value + value)
    return img


def inversion(img):
    for i in range(0, img.shape[0]):
        for j in range(0, img.shape[1]):
            img[i, j] = 255 - img[i, j]
    return img


def contrast(img, value):
    factor = (259 * (value + 255)) / (255 * (259 - value))
    for i in range(0, img.shape[0]):
        for j in range(0, img.shape[1]):
            current_value = img[i, j]
            img[i, j] = max(0, min(255, 128 + factor * (current_value - 128)))
    return img


def convolve(image, kernel):
    height, width = image.shape
    k_height, k_width = kernel.shape
    pad = int(k_height / 2)
    padded_image = repeat_borders(image, kernel)
    output = np.zeros((height, width), dtype="uint8")
    for i in range(pad, height+pad):
        for j in range(pad, width+pad):
            roi = padded_image[(i-pad):(i+pad+1), (j-pad):(j+pad+1)]
            divisor = kernel.sum() or 1
            i_out = (roi * kernel).sum()/divisor
            k = max(0, min(255, i_out))
            output[i - pad, j - pad] = int(k)
    return output


def to_tkimage(img):
    return Image.fromarray(np.uint8(img))


def repeat_borders(image, kernel):
    height, width = image.shape
    k_height, k_width = kernel.shape
    pad = int(k_height / 2)
    new_height, new_width = height + (k_height-1), width + (k_width-1)
    new_image = np.zeros((new_height, new_width), dtype="uint8")
    new_image[pad:-pad, pad:-pad] = image.copy()
    for i in range(0, new_height):
        for j in range(0, new_width):
            for bordering in range(0, pad):
                new_image[bordering, j] = new_image[pad, j]
                new_image[i, bordering] = new_image[i, pad]
            for bordering in range(1, pad+1):
                new_image[new_height-bordering, j] = new_image[new_height - (pad+1), j]
                new_image[i, new_width-bordering] = new_image[i, new_width - (pad+1)]
    return new_image


def main():
    path = "friend.jpg"
    raw = resize_image(Image.open(path))
    img = np.asarray(raw)
    img.setflags(write=True)
    grayscale = img[:, :, 0]
    if SECOND_PART:
        tkobj = WindowInter()
        tkobj.show_tk_image(grayscale)
    else:
        # grayscale = inversion(grayscale)
        # grayscale = set_brightness(grayscale, 15)
        # grayscale = contrast(grayscale, 150)
        # repeat_borders(grayscale)
        filtered = convolve(grayscale, filters_database['eastemboss'])
        raw = to_tkimage(grayscale)

        window = tk.Tk()
        window.title("Computer Graphics 1")
        window.geometry("600x400")
        window.configure(background='grey')
        filtered = to_tkimage(filtered)
        tkimg1 = ImageTk.PhotoImage(raw, master=window)
        tkimg2 = ImageTk.PhotoImage(filtered, master=window)
        panel1 = tk.Label(window, image=tkimg1)
        panel2 = tk.Label(window, image=tkimg2)
        panel1.pack(side="top", fill="both", expand="yes")
        panel2.pack(side="bottom", fill="both", expand="yes")
        window.mainloop()
main()