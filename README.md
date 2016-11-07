# FuselageMaker
CAD tool for designing model airplane fuselages. Written in AngularJS 1.2

Access this online by going here: https://rawgit.com/marlin-mixon/FuselageMaker/master/index.html

Warning, this is currently alpha-grade software so it may not be fully usable yet.  If you intend to proceed, please carefully read the following sections.

##Limitations:
- 1. This only lets you model fuselages that have bilateral symmetry when viewed from the top and front.  (I've not seen an airplane where this is not the case. Even asymmetric aircraft like the Rutan Boomerang or the German Blohm & Voss Bv-141 seem to have symmetrical fuselages.)
- 2. Your source 3-views need to have top or bottom views, side views and cross sections. And these must all be at the same scale.  This is fairly common.  
- 3. Currently you can only save one fuselage and it gets saved in your browser. this will affect your ability to work with twins where there are two fuselages (if you count the nacelle as 1 and the fuselage as 2.)
- 4. This works with Chrome and Firefox. Not sure about Internet Explorer nor Edge as I don't have them.
- 5. All cross sections and bulkheads must be vertical as viewed from the side.

##To be successful with this you will have to have to adhere closely to the following rules:
- 1. Always digitize (trace) the cross sections from top to bottom.
- 2. Always digitize only half of the cross-section and only the port side as viewed from the front.  We want to see Backwards c's.
- 3. The side and top views must be digitized from nose to tail. Also each successive point you add must get closer to the tail--no backtracking.  So just be sure features like a floatplane's step doesn't trace back on itself.  If the cross sections show the canopy then digitize the canopy.  If the cross sections omit the canopy then don't digitize it in the side view. For the top/bottom view, you only need to digitize the left side as viewed from the rear. (The right side is currently ignored)
- 4. The reference lines must also be digitized from nose to tail. Additionally, the point at the nose of the side view reference line must be the same point at the nose of the top/bottom view center line.  That's important! So be sure if the first point of your reference line starts at the tip of the spinner on the side view that it also starts at the tip of the spinner on the top/bottom view.

##Work flow:
- 1. Generally, the menu should be followed from left to right, top to bottom, i.e. do "Define Side View" first followed by "Define top/bottom view" etc.  Many things can be done out of order but you must have all of the side and top outlines done before you create cross sections and you must have cross sections before you can digitize bulkhead locations.
- 2. Quick save saves only one fuselage at a time.  It kills whatever previously existed.
- 3. Save to a file writes to fuselage.json only. It is placed in your browser's download directory.  You can manually rename this file and later read it back into Fuselage Maker using it's new name.
- 4. "Save Bulkheads to a File" only writes to bulkheads.svg (browser download directory).  Bulkheads.svg can then be read into any program that reads SVG files including Inkscape and Corel Draw.
