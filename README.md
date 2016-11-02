# FuselageMaker
CAD tool for designing model airplane fuselages. Written in AngularJS 1.2

Access this online by going here: https://rawgit.com/marlin-mixon/FuselageMaker/master/index.html

Warning, this is currently alpha-grade software so expect to lose your work and also don't expect it to be too useful.  If you intend to proceed anyway, please carefully read the following two sections.

##Limitations:
- 1. This only lets you model fuselages that have bilateral symetry when viewed from the top and front.  (I've not seen an airplane where this is not the case. Even assymetrical aircraft like the Rutan Boomerang or the German Blohm & Voss Bv-141 seem to have symetrical fuselages.)
- 2. Your source 3-views need to have top or bottom views, side views and cross sections. And these must all be at the same scale.  This is fairly common.  
- 3. Currently you can only save one fuselage and it gets saved in your browser. this will affect your ability to work with twins where there are two fuselages (if you count the nacelle as 1 and the fuselage as 2.)
- 4. This won't work with Firefox yet. It works with Chrome. Not sure about Internet Explorer.

##To be successful with this you will have to have to adhere closely to the following rules:
- 1. Always digitize (trace) the cross sections from top to bottom.
- 2. Always digitize only half of the cross-section and only the port side as viewed from the front.  We want to see Backwards c's.
- 3. The side and top views must be digitized from nose to tail.  Also each successive point you add must get closer to the tail--no backtracking.  So just be sure features like a floatplane's step doesn't trace back on itself.  Don't digitize bubble canopies but do digitize cabins.  For a mustang P-51B digitize the cabin.  For a T-6 Texan don't digitize the "greenhouse." For the top/bottom view, only digitize the left side as viewed from the rear.
