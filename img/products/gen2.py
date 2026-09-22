import math

CLAY = "#B5591F"
CLAY_D = "#8F4416"
STEEL = "#4A5560"
STEEL_D = "#333B42"
OLIVE = "#6B7A4F"
BG = "#F6F3EC"

W, H = 400, 300

def svg(inner):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">{inner}</svg>'

def diamond_pattern(pid, size, color, sw, bg=BG):
    s = size
    return f'''<defs><pattern id="{pid}" width="{s}" height="{s}" patternUnits="userSpaceOnUse">
      <path d="M{s/2},0 L{s},{s/2} L{s/2},{s} L0,{s/2} Z" fill="none" stroke="{color}" stroke-width="{sw}"/>
    </pattern></defs>
    <rect width="{W}" height="{H}" fill="{bg}"/>
    <rect width="{W}" height="{H}" fill="url(#{pid})"/>'''

def square_pattern(pid, size, color, sw, bg=BG):
    s = size
    return f'''<defs><pattern id="{pid}" width="{s}" height="{s}" patternUnits="userSpaceOnUse">
      <path d="M{s},0 L0,0 0,{s}" fill="none" stroke="{color}" stroke-width="{sw}"/>
    </pattern></defs>
    <rect width="{W}" height="{H}" fill="{bg}"/>
    <rect width="{W}" height="{H}" fill="url(#{pid})"/>'''

def hex_pattern(pid, r, color, sw, bg=BG):
    w = r*math.sqrt(3)
    h = r*2
    pts = []
    for k in range(6):
        ang = math.pi/6 + k*math.pi/3
        pts.append((w/2 + r*math.cos(ang)*0.9, h/2 + r*math.sin(ang)*0.9))
    poly = " ".join(f"{x:.1f},{y:.1f}" for x,y in pts)
    return f'''<defs><pattern id="{pid}" width="{w:.1f}" height="{h*0.75:.1f}" patternUnits="userSpaceOnUse">
      <polygon points="{poly}" fill="none" stroke="{color}" stroke-width="{sw}"/>
    </pattern></defs>
    <rect width="{W}" height="{H}" fill="{bg}"/>
    <rect width="{W}" height="{H}" fill="url(#{pid})"/>'''

open("malla-ganadera.svg","w").write(svg(diamond_pattern("p1", 60, STEEL_D, 3)))
open("malla-cinegetica.svg","w").write(svg(diamond_pattern("p2", 44, OLIVE, 2.5)))
open("malla-hercules.svg","w").write(svg(square_pattern("p3", 44, STEEL_D, 3.5)))
open("malla-simple-torsion.svg","w").write(svg(diamond_pattern("p4", 30, STEEL, 1.8)))
open("malla-electrosoldada.svg","w").write(svg(square_pattern("p5", 26, STEEL, 1.6)))
open("malla-gallinera.svg","w").write(svg(hex_pattern("p6", 22, CLAY_D, 1.8)))

# Poste
poste = f'''<rect width="{W}" height="{H}" fill="{BG}"/>
<line x1="{W/2}" y1="20" x2="{W/2}" y2="{H-20}" stroke="{STEEL_D}" stroke-width="16" stroke-linecap="round"/>
<circle cx="{W/2}" cy="18" r="12" fill="{STEEL_D}"/>
<rect x="{W/2-40}" y="{H-30}" width="80" height="14" rx="4" fill="{CLAY}"/>'''
open("poste.svg","w").write(svg(poste))

# Puerta peatonal
bars = "".join(f'<line x1="{74+i*24}" y1="54" x2="{74+i*24}" y2="246" stroke="{STEEL}" stroke-width="4"/>' for i in range(11))
puerta_p = f'''<rect width="{W}" height="{H}" fill="{BG}"/>
<rect x="60" y="40" width="14" height="220" fill="{STEEL_D}"/>
<rect x="{W-74}" y="40" width="14" height="220" fill="{STEEL_D}"/>
<rect x="60" y="40" width="{W-134}" height="14" fill="{STEEL_D}"/>
<rect x="60" y="246" width="{W-134}" height="14" fill="{STEEL_D}"/>
{bars}
<circle cx="{W-95}" cy="150" r="7" fill="{CLAY}"/>'''
open("puerta-peatonal.svg","w").write(svg(puerta_p))

# Puerta abatible 2 hojas
def leaf(x0):
    bars = "".join(f'<line x1="{x0+20+i*22}" y1="76" x2="{x0+20+i*22}" y2="220" stroke="{STEEL}" stroke-width="4"/>' for i in range(7))
    return f'''<rect x="{x0}" y="60" width="160" height="16" fill="{STEEL_D}"/>
    <rect x="{x0}" y="220" width="160" height="16" fill="{STEEL_D}"/>
    <rect x="{x0}" y="60" width="16" height="176" fill="{STEEL_D}"/>
    <rect x="{x0+144}" y="60" width="16" height="176" fill="{STEEL_D}"/>
    {bars}
    <circle cx="{x0+144}" cy="150" r="6" fill="{CLAY}"/>'''
puerta_2h = f'<rect width="{W}" height="{H}" fill="{BG}"/>' + leaf(20) + leaf(200)
open("puerta-abatible.svg","w").write(svg(puerta_2h))

# Alambre espino
spikes = "".join(f'<path d="M{x},{150-14} L{x+10},150 L{x},{150+14} L{x-10},150 Z" fill="{CLAY}"/>' for x in range(30, W, 46))
espino = f'''<rect width="{W}" height="{H}" fill="{BG}"/>
<line x1="0" y1="150" x2="{W}" y2="150" stroke="{STEEL_D}" stroke-width="3"/>
{spikes}'''
open("alambre-espino.svg","w").write(svg(espino))

# Alambre liso (bobina)
loops = "".join(f'<ellipse cx="{W/2}" cy="{50+i*36}" rx="150" ry="16" fill="none" stroke="{STEEL_D}" stroke-width="4"/>' for i in range(7))
liso = f'<rect width="{W}" height="{H}" fill="{BG}"/>{loops}'
open("alambre-liso.svg","w").write(svg(liso))

# Kit vallado
ticks = "".join(f'<line x1="{90-50*math.cos(a):.1f}" y1="{150-50*math.sin(a):.1f}" x2="{90+50*math.cos(a):.1f}" y2="{150+50*math.sin(a):.1f}" stroke="{STEEL}" stroke-width="1.2" opacity="0.6"/>' for a in [0.3,0.9,1.5,2.1,2.7])
gate_bars = "".join(f'<line x1="{280+i*16}" y1="98" x2="{280+i*16}" y2="232" stroke="{CLAY}" stroke-width="3"/>' for i in range(6))
kit = f'''<rect width="{W}" height="{H}" fill="{BG}"/>
<circle cx="90" cy="150" r="70" fill="none" stroke="{STEEL_D}" stroke-width="10"/>
{ticks}
<line x1="220" y1="60" x2="220" y2="240" stroke="{STEEL_D}" stroke-width="14" stroke-linecap="round"/>
<circle cx="220" cy="58" r="10" fill="{STEEL_D}"/>
<rect x="270" y="90" width="90" height="150" fill="none" stroke="{CLAY}" stroke-width="8"/>
{gate_bars}'''
open("kit-vallado.svg","w").write(svg(kit))

# Accesorio
acc = f'''<rect width="{W}" height="{H}" fill="{BG}"/>
<rect x="130" y="110" width="140" height="80" rx="10" fill="none" stroke="{STEEL_D}" stroke-width="8"/>
<circle cx="150" cy="130" r="6" fill="{CLAY}"/>
<circle cx="250" cy="130" r="6" fill="{CLAY}"/>
<circle cx="150" cy="170" r="6" fill="{CLAY}"/>
<circle cx="250" cy="170" r="6" fill="{CLAY}"/>
<line x1="130" y1="150" x2="270" y2="150" stroke="{STEEL}" stroke-width="4"/>'''
open("accesorio.svg","w").write(svg(acc))

# Malla ocultacion
vlines = "".join(f'<line x1="{i*20}" y1="0" x2="{i*20}" y2="{H}" stroke="{OLIVE}" stroke-width="1" opacity="0.4"/>' for i in range(21))
hlines = "".join(f'<line x1="0" y1="{j*20}" x2="{W}" y2="{j*20}" stroke="{OLIVE}" stroke-width="1" opacity="0.4"/>' for j in range(16))
ocult = f'''<rect width="{W}" height="{H}" fill="#EAEBDD"/>
<rect width="{W}" height="{H}" fill="{OLIVE}" opacity="0.18"/>
{vlines}{hlines}
<rect x="20" y="20" width="{W-40}" height="{H-40}" fill="none" stroke="{OLIVE}" stroke-width="5"/>'''
open("malla-ocultacion.svg","w").write(svg(ocult))

print("done")
