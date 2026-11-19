# Crops a photo out of one of Lee's original page images, trimming the white page margin.
# python3 crop.py <doc> name:page:x0,y0,x1,y1 ...   (page coordinates, 1100 x 1556)
import sys, numpy as np
from PIL import Image
doc = sys.argv[1]
for spec in sys.argv[2:]:
    name, p, box = spec.split(':'); a, b, c, d = map(int, box.split(','))
    im = Image.open('../docs/%s-original/%s.webp' % (doc, p)).convert('RGB').crop((a - 12, b - 12, c + 12, d + 12))
    nw = np.asarray(im).astype(int).min(axis=2) < 238
    rows = np.where(nw.mean(axis=1) > .5)[0]; cols = np.where(nw.mean(axis=0) > .5)[0]
    out = im.crop((cols[0] + 3, rows[0] + 3, cols[-1] - 2, rows[-1] - 2)); out.save('img/%s.jpg' % name, quality=94); print(name, out.size)
