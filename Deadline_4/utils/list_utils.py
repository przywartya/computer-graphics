def arrange_points(points: list):
    return sorted(points, key=lambda p: p.x)

def arrange_rectangle_points(points: list):
    return sorted(points , key=lambda p: [p.y, p.x])