import sys
import json

def format_line(lin):
    lin = lin.strip().split(',')
    lin.pop()
    return lin

a = sys.stdin
coordinates = []

for line in a:
    y = line.find('<Polygon>')
    if y >= 0:
        break
for line in a:
    count = line.find('<coordinates>')
    if (count >= 0):
        b = a.readline()
        c = b.split()
        points = []
        polygon = []
        d = a.readline()
        single_line = d.find('</coordinates>')
        if (single_line >= 0):
            for coords in c:
                points = format_line(coords)
                polygon.append(points)
                points = []
            for p in polygon:
                coordinates.append(
                    {'lat': float(p[1]), 'lng': float(p[0])})
            js_coords = json.dumps(coordinates)
            print(js_coords)
        elif(single_line <= 0):
            b = format_line(b)
            d = format_line(d)
            polygon.append(b)
            polygon.append(d)
            e = a.readline()
            while (e.find('</coordinates>') <= 0):
                e = format_line(e)
                polygon.append(e)
                e = a.readline()
            for p in polygon:
                coordinates.append(
                    {'lat': float(p[1]), 'lng': float(p[0])})
            js_coords = json.dumps(coordinates)
            print(js_coords)

sys.stdout.flush()
