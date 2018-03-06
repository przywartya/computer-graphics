import tkinter as tk
from PIL import ImageTk, Image
import numpy as np


filters_database = {
    'blur': np.array((
        [1/25, 1/25, 1/25, 1/25, 1/25],
        [1/25, 1/25, 1/25, 1/25, 1/25],
        [1/25, 1/25, 1/25, 1/25, 1/25],
        [1/25, 1/25, 1/25, 1/25, 1/25],
        [1/25, 1/25, 1/25, 1/25, 1/25],
    ), dtype="float"),
    'gaussian': np.array((
        [0, 1/25, 2/25, 1/25, 0],
        [1/25, 4/25, 8/25, 4/25, 1/25],
        [2/25, 8/25, 16/25, 8/25, 2/25],
        [1/25, 4/25, 8/25, 4/25, 1/25],
        [0, 1/25, 2/25, 1/25, 0]), dtype="float"),
    'sharpen1': np.array((
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0]), dtype="int"),
    'sharpen2': np.array((
        [-1, -1, -1],
        [-1, 9, -1],
        [-1, -1, -1]), dtype="int"),
    'Hedgedetect(set offset=127)': np.array((
        [0, -1, 0],
        [0, 1, 0],
        [0, 0, 0]), dtype="int"),
    'Vedgedetect(set offset=127)': np.array((
        [0, 0, 0],
        [-1, 1, 0],
        [0, 0, 0]), dtype="int"),
    'Dedgedetect(set offset=127)': np.array((
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


class WindowInter:
    entries = []
    top, bottom, mode, kernel_choice = None, None, None, None
    offset, divisor = None, None
    contrast, brightness, gamma = None, None, None
    k_height, k_width, anchor_row, anchor_col = None, None, None, None

    def __init__(self):
        self.window = tk.Tk()

        self.window.title("Computer Graphics 1")
        self.window.geometry("600x600")
        self.window.configure(background='grey')
        self.panel3 = tk.Label(self.window)
        self.panel3.pack(side="left")

        path = file_dialog()
        raw = resize_image(Image.open(path))
        img = np.asarray(raw)
        img.setflags(write=True)
        grayscale = img[:, :, 0]
        self.show_tk_image(grayscale)

    def button_filter_handler(self, key):
        middle = int((len(filters_database[key][0]) - 1) / 2)
        (self.anchor_col, self.anchor_row) = (middle, middle)
        (self.k_width, self.k_height) = filters_database[key].shape
        self.create_grid()
        filts = filters_database[key].flatten()
        for index, entry in enumerate(self.entries):
            entry.insert(1, str(filts[index]))
        self.show_images(filters_database[key])

    def function_filters_handler(self, method):
        window = tk.Tk()
        window.title("Computer Graphics 1")
        window.geometry("600x600")
        window.configure(background='grey')
        raw = self.top.copy()
        raw = to_tkimage(raw)
        filtered = to_tkimage(method())
        tkimg1 = ImageTk.PhotoImage(raw, master=window)
        tkimg2 = ImageTk.PhotoImage(filtered, master=window)
        panel1 = tk.Label(window, image=tkimg1)
        panel2 = tk.Label(window, image=tkimg2)
        panel1.pack(side="top", fill="both", expand="yes")
        panel2.pack(side="bottom", fill="both", expand="yes")
        window.mainloop()

    def create_function_filters_buttons(self):
        from functools import partial
        panel5 = tk.Label(self.window)

        command_with_arg = partial(self.function_filters_handler, self.set_gamma)
        button = tk.Button(panel5, text="Gamma", command=command_with_arg)
        button.pack()

        command_with_arg = partial(self.function_filters_handler, self.set_contrast)
        button = tk.Button(panel5, text="Contrast", command=command_with_arg)
        button.pack()

        command_with_arg = partial(self.function_filters_handler, self.set_brightness)
        button = tk.Button(panel5, text="Brightness", command=command_with_arg)
        button.pack()

        command_with_arg = partial(self.function_filters_handler, self.inversion)
        button = tk.Button(panel5, text="Inversion", command=command_with_arg)
        button.pack()
        panel5.pack(side='bottom')

    def create_readymade_filter_buttons(self):
        from functools import partial
        panel5 = tk.Label(self.window)
        for key in filters_database:
            command_with_arg = partial(self.button_filter_handler, key)
            button = tk.Button(panel5, text=key, command=command_with_arg)
            button.pack()
        panel5.pack(side='right')

    def create_input(self, name):
        label = tk.StringVar()
        label.set(name)
        label_dir = tk.Label(self.window, textvariable=label, width=10)
        label_dir.pack()

    def show_buttons(self):
        self.create_readymade_filter_buttons()
        self.create_function_filters_buttons()
        self.create_input("Offset")
        self.offset = tk.Entry(self.window, width=5)
        self.offset.pack()
        self.create_input("Divisor")
        self.divisor = tk.Entry(self.window, width=5)
        self.divisor.pack()
        self.create_input("Contrast")
        self.contrast = tk.Entry(self.window, width=5)
        self.contrast.pack()
        self.create_input("Brightness")
        self.brightness = tk.Entry(self.window, width=5)
        self.brightness.pack()
        self.gamma = tk.Scale(self.window, from_=0, to=200)
        self.gamma.pack()

        panel4 = tk.Label(self.window)
        label = tk.StringVar()
        label.set("Kernel width")
        label_dir = tk.Label(panel4, textvariable=label, width=20)
        label_dir.pack()
        self.k_width = tk.Entry(panel4, width=5)
        self.k_width.pack()
        label = tk.StringVar()
        label.set("Kernel height")
        label_dir = tk.Label(panel4, textvariable=label, width=20)
        label_dir.pack()
        self.k_height = tk.Entry(panel4, width=5)
        self.k_height.pack()
        label = tk.StringVar()
        label.set("Anchor row")
        label_dir = tk.Label(panel4, textvariable=label, width=20)
        label_dir.pack()
        self.anchor_row = tk.Entry(panel4, width=5)
        self.anchor_row.pack()
        label = tk.StringVar()
        label.set("Anchor column")
        label_dir = tk.Label(panel4, textvariable=label, width=20)
        label_dir.pack()
        self.anchor_col = tk.Entry(panel4, width=5)
        self.anchor_col.pack()

        button = tk.Button(panel4, text="Create grid", command=self.create_grid)
        button.pack()
        panel4.pack(side="left")

    def set_gamma(self):
        img = self.top.copy()
        gamma = float((self.gamma.get()/100) or 0)
        for i in range(0, img.shape[0]):
            for j in range(0, img.shape[1]):
                corrected = 255*((img[i, j]/255)**gamma)
                img[i, j] = min(255, corrected)
        return img

    def set_brightness(self):
        img = self.top.copy()
        brightness = int(self.brightness.get() or 0)
        for i in range(0, img.shape[0]):
            for j in range(0, img.shape[1]):
                current_value = img[i, j]
                img[i, j] = min(255, current_value + brightness)
        return img

    def inversion(self):
        img = self.top.copy()
        for i in range(0, img.shape[0]):
            for j in range(0, img.shape[1]):
                img[i, j] = 255 - img[i, j]
        return img

    def set_contrast(self):
        img = self.top.copy()
        contrast = int(self.contrast.get() or 0)
        F = (259*(contrast + 255))/(255*(259-contrast))
        for i in range(0, img.shape[0]):
            for j in range(0, img.shape[1]):
                current_value = img[i, j]
                img[i, j] = max(0, min(255, 128 + (F*(current_value - 128))))
        return img

    def create_grid(self):
        if type(self.k_width) is not int:
            self.k_width = int(self.k_width.get() or 0)
        if type(self.k_height) is not int:
            self.k_height = int(self.k_height.get() or 0)
        if type(self.anchor_row) is not int:
            self.anchor_row = int(self.anchor_row.get() or 0) - 1
        if type(self.anchor_col) is not int:
            self.anchor_col = int(self.anchor_col.get() or 0) - 1
        self.entries = []
        for widget in self.panel3.winfo_children():
            widget.destroy()
        columns = 0
        while columns < self.k_width + 1:
            self.panel3.columnconfigure(columns, weight=1)
            columns += 1
        rows = 0
        while columns < self.k_height + 1:
            self.panel3.rowconfigure(rows, weight=1)
            rows += 1
        for i in range(0, self.k_height):
            for j in range(0, self.k_width):
                entry_widget = tk.Entry(self.panel3, width=3)
                entry_widget.grid(row=i, column=j)
                if i == self.anchor_row and j == self.anchor_col:
                    entry_widget.config({"background": "Green"})
                self.entries.append(entry_widget)
        submit_button = tk.Button(self.panel3, command=self.button)
        submit_button.grid(row=self.k_height + 1)

    def show_tk_image(self, top):
        self.top = top
        self.show_buttons()
        self.window.mainloop()

    def show_images(self, kernel):
        window = tk.Tk()
        window.title("Computer Graphics 1")
        window.geometry("600x400")
        window.configure(background='grey')

        offset = int(self.offset.get() or 0)
        divisor = int(self.divisor.get() or 1)
        anchor = (self.anchor_col, self.anchor_row)

        # filtered = convolve(self.top, kernel, offset, divisor)
        filtered = self.new_convolve(self.top, kernel, offset, divisor, anchor)
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
        input_numbers = [int(entry.get() or 0) for entry in self.entries]
        arr = np.array(input_numbers)
        arr = arr.reshape((self.k_height, self.k_width))
        self.show_images(arr)

    def new_convolve(self, image, kernel, offset, divisor, anchor=None):
        height, width = image.shape
        k_height, k_width = kernel.shape
        result = image.copy()
        for y in range(0, height):
            for x in range(0, width):
                val = 0
                for j in range(0, k_height):
                    for i in range(0, k_width):
                        mx = x + i - anchor[0]
                        my = y + j - anchor[1]
                        if mx < 0:
                            mx = 0
                        else:
                            if mx >= width:
                                mx = width - 1
                        if my < 0:
                            my = 0
                        else:
                            if my >= height:
                                my = height - 1
                        val += kernel[j, i] * image[my, mx]
                val = max(0, min(255, offset + (val / divisor)))
                result[y, x] = val
        return result


def resize_image(img):
    wpercent = (300/float(img.size[0]))
    hsize = int((float(img.size[1])*float(wpercent)))
    img = img.resize((300, hsize), Image.ANTIALIAS)
    return img


def convolve(image, kernel, offset=0, divisor=None):
    height, width = image.shape
    k_height, k_width = kernel.shape
    pad = int(k_height / 2)
    padded_image = repeat_borders(image, kernel)
    if not divisor:
        # divisor = kernel.size
        divisor = kernel.sum() or 1
    output = np.zeros((height, width), dtype="uint8")
    for i in range(pad, height+pad):
        for j in range(pad, width+pad):
            roi = padded_image[(i-pad):(i+pad+1), (j-pad):(j+pad+1)]
            i_out = offset + ((roi * kernel).sum()/divisor)
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


def file_dialog():
    from tkinter.filedialog import askopenfilename
    path = askopenfilename(filetypes=(("jpeg files",".jpg"),("all files","*.*")))
    return path


def main():
    WindowInter()


main()

