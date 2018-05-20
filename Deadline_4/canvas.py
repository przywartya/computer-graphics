import itertools
import math

import tkinter as tk
import numpy as np

from utils.dataclasses import Point
from utils.list_utils import arrange_points, arrange_rectangle_points

canvas_width = 400
canvas_height = 400
python_green = "#476042"


class AETPointer:
    def __init__(self, p1, p2, next_edge):
        self.next_edge = next_edge
        dx = p1.x - p2.x
        dy = p1.y - p2.y
        self.m_inverse = dx/dy
        if p1.x > p2.x:
            if self.m_inverse < 0:
                self.x = p1.x
            else:
                self.x = p2.x    
        else:
            if self.m_inverse < 0:
                self.x = p2.x
            else:
                self.x = p1.x
        if p1.y > p2.y:
            self.ymax = p1.y
        else:
            self.ymax = p2.y

    def __str__(self):
        return "AET ymax: {}, x: {}, 1/m: {} ".format(self.ymax, self.x, self.m_inverse)


class ActiveEdgeTable:
    def __init__(self):
        self.current = None
    
    def insert(self, p1, p2):
        new_edge = AETPointer(p1, p2, self.current)
        self.current = new_edge

class Board:
    def __init__(self, master, canvas):
        self.i = 0
        self.points = []
        self.canvas = canvas
        self.img = tk.PhotoImage(width=canvas_width, height=canvas_height)
        self.canvas.create_image((canvas_width // 2, canvas_height // 2), image=self.img, state="normal")
        self.master = master
        self.mode = self.Rectangle
        self.last_rectangle = None
        canvas.bind("<Button-1>", self.paint)
        self.make_buttons()

    def make_buttons(self):
        button = tk.Button(master, text="Rectangle", command=lambda: self.set_mode(self.Rectangle))
        button.pack(side=tk.BOTTOM)
        button = tk.Button(master, text="End polygon", command=self.end_polygon)
        button.pack(side=tk.BOTTOM)
        button = tk.Button(master, text="Start polygon", command=lambda: self.set_mode(self.start_polygon))
        button.pack(side=tk.BOTTOM)
        button = tk.Button(master, text="Liang Barsky", command=lambda: self.set_mode(self.LB))
        button.pack(side=tk.BOTTOM)
        button = tk.Button(master, text="Redraw", command=self.redraw)
        button.pack(side=tk.BOTTOM)

    def create_input(self, name):
        label = tk.IntVar()
        label.set(name)
        label_dir = tk.Label(self.master, textvariable=label, width=10)
        label_dir.pack()

    def set_mode(self, mode):
        self.mode = mode
        self.points = []
    
    def start_polygon(self):
        pass

    def end_polygon(self):
        for idx, point in enumerate(self.points):
            point.idx = idx
            self.my_dda(self.points[idx], self.points[(idx+1)%len(self.points)], color="#000000")
        sorted_points = arrange_rectangle_points(self.points)
        AET = []
        indices = [point.idx for point in sorted_points]
        k = 0
        i = indices[k]
        ymin = self.points[indices[0]].y
        ymax = self.points[indices[-1]].y
        y = ymin
        print(indices)
        print(ymin, ymax)
        while y < ymax:
            while self.points[i].y == y:
                if self.points[i-1].y > self.points[i].y:
                    AET.append(AETPointer(self.points[i-1], self.points[i]))
                if self.points[(i + 1) % len(self.points)].y > self.points[i].y:
                    AET.append(AETPointer(self.points[(i + 1) % len(self.points)], self.points[i]))
                k += 1
                if k >= len(indices):
                    break
                i = indices[k]
            AET = sorted(AET, key=lambda e: e.x)
            print("Current Y {}".format(y))
            print("AET post sorted")
            for xd in AET:
                print(xd)
            for idx, edge in enumerate(AET):
                if (idx + 1) == len(AET):
                    break
                if idx % 2 != 0:
                    continue
                next_edge = AET[idx + 1]
                print("Printing Y: {} line between {} and {}".format(y, int(edge.x), int(next_edge.x)))
                put_y = self.canvas.winfo_reqheight() - int(y)
                for x_iter in range(math.ceil(edge.x), math.floor(next_edge.x)-1):
                    self.img.put("#00ff00", (x_iter, put_y))
            y += 1
            AET = [edge for edge in AET if edge.ymax != y]
            for edge in AET:
                edge.x += edge.m_inverse

    def paint(self, event):
        y = self.canvas.winfo_reqheight() - event.y
        p1 = Point(event.x, y)
        print(p1)
        self.i += 1
        self.try_create_pixel(p1)

        if self.mode == self.start_polygon:
            print("Polygon mode")
            return

        if self.mode in [self.DDA, self.Rectangle, self.LB]:
            if not len(self.points) % 2:
                self.mode()
        else:
            self.mode()

    def try_create_pixel(self, p, color='#ff0000'):
        if 0 < p.x < canvas_width and 0 < p.y < canvas_height:
            y = self.canvas.winfo_reqheight() - p.y
            self.img.put(color, (p.x, y))
            self.points.append(p)

    def redraw(self, mode=None):
        self.points = []
        self.img = tk.PhotoImage(width=canvas_width, height=canvas_height)
        self.canvas.create_image((canvas_width // 2, canvas_height // 2), image=self.img, state="normal")
        if mode:
            self.mode = mode

    def LB(self):
        Point1, Point2 = arrange_points(self.points[-2:])
        print("LB from {} to {}".format(Point1, Point2))
        x1, y1 = Point1.x, Point1.y
        x2, y2 = Point2.x, Point2.y
        r1, r2, r3, r4 = arrange_rectangle_points(self.last_rectangle)
        xmin, ymin = r1.x, r1.y
        xmax, ymax = r4.x, r4.y
        p1 = -(x2 - x1)
        p2 = -p1
        p3 = -(y2 - y1)
        p4 = -p3
        q1 = x1 - xmin
        q2 = xmax - x1
        q3 = y1 - ymin
        q4 = ymax - y1
        posarr, negarr = [1], [0]
        if (p1 == 0 and q1 < 0) or (p3 == 0 and q3 < 0):
            print("Line is parallel to clipping window!")
            return
        if p1 != 0:
            r1 = q1 / p1
            r2 = q2 / p2
            if p1 < 0:
                negarr.append(r1)
                posarr.append(r2)
            else:
                negarr.append(r2)
                posarr.append(r1)
        if p3 != 0:
            r3 = q3 / p3
            r4 = q4 / p4
            if p3 < 0:
                negarr.append(r3)
                posarr.append(r4)
            else:
                negarr.append(r4)
                posarr.append(r3)
        print(negarr, posarr)
        rn1 = max(negarr)
        rn2 = min(posarr)
        if rn1 > rn2:
            print("Line is outside the clipping window!")
            return
        xn1 = x1 + (p2 * rn1)
        yn1 = y1 + (p4 * rn1)
        xn2 = x1 + (p2 * rn2)
        yn2 = y1 + (p4 * rn2)
        self.my_dda(
            Point(int(xn1), int(yn1)), 
            Point(int(xn2), int(yn2))
        )
        if x1 != xn1 and y1 != yn1:
            self.my_dda(
                Point(int(x1), int(y1)), 
                Point(int(xn1), int(yn1)),
                '#0000ff'
            )
        if x2 != xn2 and y2 != yn2:
            self.my_dda(
                Point(int(x2), int(y2)), 
                Point(int(xn2), int(yn2)),
                '#0000ff'
            )
        self.points = []

    def DDA(self):
        p1, p2 = arrange_points(self.points[-2:])
        print("DDA from {} to {}".format(p1, p2))
        dy = p2.y - p1.y
        dx = p2.x - p1.x
        step = abs(dx if dx >= abs(dy) else dy)
        dx, dy = dx / step, dy / step
        while step > 0:
            self.try_create_pixel(Point(int(p1.x), int(p1.y)))
            p1.y += dy
            p1.x += dx
            step -= 1

    def my_dda(self, p1, p2, color='#ff0000'):
        p1, p2 = arrange_points([p1, p2])
        p1, p2 = Point(int(p1.x), int(p1.y)), Point(int(p2.x), int(p2.y))
        dy = p2.y - p1.y
        dx = p2.x - p1.x
        step = abs(dx if dx >= abs(dy) else dy)
        dx, dy = dx / step, dy / step
        while step > 0:
            y = self.canvas.winfo_reqheight() - int(p1.y)
            self.img.put(color, (int(p1.x), int(y)))    
            p1.y += dy
            p1.x += dx
            step -= 1

    def Rectangle(self):
        p1, p2 = arrange_points(self.points[-2:])
        p3 = Point(int(p1.x), int(p2.y))
        p4 = Point(int(p2.x), int(p1.y))
        print("Rectangle {} {} {} {}".format(p3, p2, p4, p1))
        self.my_dda(p3, p2)
        self.my_dda(p4, p2)
        self.my_dda(p3, p1)
        self.my_dda(p4, p1)
        self.last_rectangle = [p3, p2, p4, p1]
        self.points = []


if __name__ == '__main__':
    master = tk.Tk()
    master.title("Canvas Drawing")
    w = tk.Canvas(master, width=canvas_width, height=canvas_height, bd=5, highlightthickness=0, relief='ridge')
    w.pack()
    b = Board(master, w)
    tk.mainloop()
