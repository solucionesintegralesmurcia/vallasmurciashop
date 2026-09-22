import os

CLAY = "#B5591F"
CLAY_D = "#8F4416"
STEEL = "#4A5560"
STEEL_D = "#333B42"
OLIVE = "#6B7A4F"
BG = "#F6F3EC"
LINE = "#DDD7C8"

W, H = 400, 300

def wrap(body, bg=BG):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">' \
           f'<rect width="{W}" height="{H}" fill="{bg}"/>{body}</svg>'

def diamond_mesh(rows, cols, stroke, sw, offset_extra=0, bg=BG):
    body = ""
    cell_w = W / cols
    cell_h = H / (rows/1.4)
    y = -cell_h
    row_i = 0
    while y < H + cell_h:
        x0 = -cell_w if row_i % 2 else -cell_w/2
        x = x0
        while x < W + cell_w:
            body += f'<path d="M{x},{y+cell_h/2} L{x+cell_w/2},{y} L{x+cell_w},{y+cell_h/2} L{x+cell_w/2},{y+cell_h} Z" fill="none" stroke="{stroke}" stroke-width="{sw}"/>'
            x += cell_w
        y += cell_h/2
        row_i += 1
    return wrap(body, bg)

def square_mesh(cols, rows, stroke, sw, bg=BG):
    body = ""
    cw, ch = W/cols, H/rows
    for i in range(cols+1):
        x = i*cw
        body += f'<line x1="{x}" y1="0" x2="{x}" y2="{H}" stroke="{stroke}" stroke-width="{sw}"/>'
    for j in range(rows+1):
        y = j*ch
        body += f'<line x1="0" y1="{y}" x2="{W}" y2="{y}" stroke="{stroke}" stroke-width="{sw}"/>'
    return wrap(body, bg)

def hex_mesh(stroke, sw, bg=BG):
    body = ""
    r = 22
    dx = r*1.8
    dy = r*1.0
    row = 0
    y = -r
    while y < H + r:
        offset = dx/2 if row % 2 else 0
        x = -dx + offset
        while x < W + dx:
            pts = []
            for k in range(6):
                import math
                ang = math.pi/6 + k*math.pi/3
                pts.append(f"{x+r*math.cos(ang):.1f},{y+r*math.sin(ang):.1f}")
            body += f'<polygon points="{" ".join(pts)}" fill="none" stroke="{stroke}" stroke-width="{sw}"/>'
            x += dx
        y += dy*1.5
        row += 1
    return wrap(body, bg)

# 1. Malla ganadera: diamante grande, hilo grueso, tono acero sobre crema
open("malla-ganadera.svg","w").write(diamond_mesh(6,6,STEEL_D,3))

# 2. Malla cinegetica: diamante con separacion variable (mas alto), tono oliva
open("malla-cinegetica.svg","w").write(diamond_mesh(8,7,OLIVE,2.5))

# 3. Valla hercules: rejilla soldada gruesa
open("malla-hercules.svg","w").write(square_mesh(10,7,STEEL_D,3.5))

# 4. Malla simple torsion: diamante fino
open("malla-simple-torsion.svg","w").write(diamond_mesh(10,9,STEEL,1.8))

# 5. Malla electrosoldada: rejilla fina verde-acero
open("malla-electrosoldada.svg","w").write(square_mesh(14,10,STEEL,1.6))

# 6. Malla gallinera: hexagonal
open("malla-gallinera.svg","w").write(hex_mesh(CLAY_D,1.8))

# 7/8. Poste metalico
poste = f'''
<line x1="{W/2}" y1="20" x2="{W/2}" y2="{H-20}" stroke="{STEEL_D}" stroke-width="16" stroke-linecap="round"/>
<circle cx="{W/2}" cy="18" r="12" fill="{STEEL_D}"/>
<rect x="{W/2-40}" y="{H-30}" width="80" height="14" rx="4" fill="{CLAY}"/>
'''
open("poste.svg","w").write(wrap(poste))

# 9. Puerta peatonal
puerta_p = f'''
<rect x="60" y="40" width="14" height="220" fill="{STEEL_D}"/>
<rect x="{W-74}" y="40" width="14" height="220" fill="{STEEL_D}"/>
<rect x="60" y="40" width="{W-134}" height="14" fill="{STEEL_D}"/>
<rect x="60" y="246" width="{W-134}" height="14" fill="{STEEL_D}"/>
{"".join(f'<line x1="{74+i*24}" y1="54" x2="{74+i*24}" y2="246" stroke="{STEEL}" stroke-width="4"/>' for i in range(11))}
<circle cx="{W-95}" cy="150" r="7" fill="{CLAY}"/>
'''
open("puerta-peatonal.svg","w").write(wrap(puerta_p))

# 10. Puerta abatible dos hojas
puerta_2h = f'''
<rect x="20" y="60" width="{W/2-40}" height="16" fill="{STEEL_D}"/>
<rect x="20" y="220" width="{W/2-40}" height="16" fill="{STEEL_D}"/>
<rect x="20" y="60" width="16" height="176" fill="{STEEL_D}"/>
<rect x="{W/2-8}" y="60" width="16" height="176" fill="{STEEL_D}"/>
{"".join(f'<line x1="{40+i*22}" y1="76" x2="{40+i*22}" y2="220" stroke="{STEEL}" stroke-width="4"/>' for i in range(7))}
<rect x="{W/2+8}" y="60" width="{W/2-40}" height="16" fill="{STEEL_D}"/>
<rect x="{W/2+8}" y="220" width="{W/2-40}" height="16" fill="{STEEL_D}"/>
<rect x="{W/2+8}" y="60" width="16" height="176" fill="{STEEL_D}"/>
<rect x="{W-36}" y="60" width="16" height="176" fill="{STEEL_D}"/>
{"".join(f'<line x1="{W/2+26+i*22}" y1="76" x2="{W/2+26+i*22}" y2="220" stroke="{STEEL}" stroke-width="4"/>' for i in range(7))}
<circle cx="{W/2-16}" cy="150" r="6" fill="{CLAY}"/>
<circle cx="{W/2+16}" cy="150" r="6" fill="{CLAY}"/>
'''
open("puerta-abatible.svg","w").write(wrap(puerta_2h))

# 11. Alambre espino
espino = ""
y = 150
espino += f'<line x1="0" y1="{y}" x2="{W}" y2="{y}" stroke="{STEEL_D}" stroke-width="3"/>'
x = 20
while x < W:
    espino += f'<path d="M{x},{y-14} L{x+10},{y} L{x},{y+14} L{x-10},{y} Z" fill="{CLAY}"/>'
    x += 46
open("alambre-espino.svg","w").write(wrap(espino))

# 12. Alambre liso (varias vueltas de bobina)
liso = ""
for i in range(6):
    yy = 60 + i*32
    liso += f'<ellipse cx="{W/2}" cy="{yy}" rx="150" ry="14" fill="none" stroke="{STEEL_D}" stroke-width="4"/>'
open("alambre-liso.svg","w").write(wrap(liso))

# 13. Kit de vallado (rollo + poste + puerta mini)
kit = f'''
<circle cx="90" cy="150" r="70" fill="none" stroke="{STEEL_D}" stroke-width="10"/>
<circle cx="90" cy="150" r="70" fill="none" stroke="{STEEL}" stroke-width="2"/>
{"".join(f'<line x1="{90-50*__import__("math").cos(a)}" y1="{150-50*__import__("math").sin(a)}" x2="{90+50*__import__("math").cos(a)}" y2="{150+50*__import__("math").sin(a)}" stroke="{STEEL}" stroke-width="1.2" opacity="0.6"/>' for a in [0.3,0.9,1.5,2.1,2.7])}
<line x1="220" y1="60" x2="220" y2="240" stroke="{STEEL_D}" stroke-width="14" stroke-linecap="round"/>
<circle cx="220" cy="58" r="10" fill="{STEEL_D}"/>
<rect x="270" y="90" width="90" height="150" fill="none" stroke="{CLAY}" stroke-width="8"/>
{"".join(f'<line x1="{280+i*16}" y1="98" x2="{280+i*16}" y2="232" stroke="{CLAY}" stroke-width="3"/>' for i in range(6))}
'''
open("kit-vallado.svg","w").write(wrap(kit))

# 14/15. Accesorio (grapa / tensor) generico ferreteria
acc = f'''
<rect x="130" y="110" width="140" height="80" rx="10" fill="none" stroke="{STEEL_D}" stroke-width="8"/>
<circle cx="150" cy="130" r="6" fill="{CLAY}"/>
<circle cx="250" cy="130" r="6" fill="{CLAY}"/>
<circle cx="150" cy="170" r="6" fill="{CLAY}"/>
<circle cx="250" cy="170" r="6" fill="{CLAY}"/>
<line x1="130" y1="150" x2="270" y2="150" stroke="{STEEL}" stroke-width="4"/>
'''
open("accesorio.svg","w").write(wrap(acc))

# 16. Malla ocultacion (tejido solido verde)
ocult = f'''
<rect x="0" y="0" width="{W}" height="{H}" fill="{OLIVE}" opacity="0.18"/>
{"".join(f'<line x1="{i*20}" y1="0" x2="{i*20}" y2="{H}" stroke="{OLIVE}" stroke-width="1" opacity="0.4"/>' for i in range(21))}
{"".join(f'<line x1="0" y1="{j*20}" x2="{W}" y2="{j*20}" stroke="{OLIVE}" stroke-width="1" opacity="0.4"/>' for j in range(16))}
<rect x="20" y="20" width="{W-40}" height="{H-40}" fill="none" stroke="{OLIVE}" stroke-width="5"/>
'''
open("malla-ocultacion.svg","w").write(wrap(ocult, bg="#EAEBDD"))

print("OK", os.listdir("."))
