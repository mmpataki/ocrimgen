var fsizes = [];
var fonts = [];
var bb;
//var prnt = "`1234567890-=qwertyuiop[]\\';lkjhgfdsazxcvbnm,./~!@#$%^&*()_+|}{POIUYTREWQASDFGHJKL:\"?><MNBVCXZ";
var prnt = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var dsizes, dfonts;
var styles = [];
var zip;
var ext = "png";
var count, threshold = 500;

window.onload = function() {
	dsizes = g("sizes");
	dfonts = g("fonts");
	bb = g("blackboard");
	zip = new JSZip();
}

function gensingleimage(lines, s, fid, sid, maxwidth) {

	var c = document.createElement("canvas");
	var x = c.getContext("2d");
	var name = `image-${s}-${fid}-${sid}.${ext}`;

	c.height = lines.length * s;
	c.width = s * maxwidth;
	x.font = `${styles[sid]} ${s}px ${fonts[fid]}`;
	x.fillStyle = "#000";
	x.textBaseline = "top";

	for(var i=0; i<lines.length; i++) {
		x.fillText(lines[i], 0, i * s);
	}

	zip.file(name, c.toDataURL().substr(c.toDataURL().indexOf(',')+1), {base64: true});
}


function genimageswithdata() {
	var lines = document.getElementById("imgdata").value.split('\n');
	var maxlen=0;
	styles = getfstyles();
	/* calculate max line length of the text */
	for(var i=0; i<lines.length; i++) {
		if(maxlen<lines[i].length)
			maxlen=lines[i].length;
	}

	for (var i = 0; i < fonts.length; i++) {
		for (var j = 0; j < fsizes.length; j++) {
			for (var k = 0; k < styles.length; k++) {
				gensingleimage(lines, fsizes[j], i, k, maxlen);
			}
		}
	}
	var zipname = g("zipname").value;
	if(zipname == "") {
		zipname = `dataset-${(new Date()).toLocaleString().replace(/\//g, "-")}.zip`;
	}
	zip.generateAsync({type:"blob"}).then(function(content) {
		saveAs(content, zipname);
	});
}

function g(id) { return document.getElementById(id); }

function msearch(arr, val) {
	for(var i=0; i<arr.length; i++)
		if(fonts[i] == val)
			return true;
	return false;
}

function addfsize() {
	var nsize = g("fsize").value;
	if(!msearch(fsizes, nsize)) {
		fsizes.push(nsize);
		dsizes.innerText = "Font-sizes : \n" + JSON.stringify(fsizes).replace(/,/g, "\n").replace("]", "").replace("[", "");
	}
}

function addfont() {
	var nfont = g("fname").value;
	if(!msearch(fonts, nfont)) {
		fonts.push(nfont);
		dfonts.innerText = "Fonts : \n" + JSON.stringify(fonts).replace(/,/g, "\n").replace("[", "").replace("]", "");
	}
}

function getfstyles() {
	var aa= document.getElementsByTagName("input");
	styles = [];
	for (var i =0; i < aa.length; i++)
		if (aa[i].type == 'checkbox' && aa[i].checked)
			styles.push(aa[i].value);
	return styles;
}

// adds the image of ch of size s, font-id fid, styleid sid to zip file.
// each file has a naming convention image files are named as
// cid-s-fid-sid.ext
// where :
// 	cid : character id of the character in the image
//	s   : size of image in pixels.
//	fid : font-id of the text.
//	sid : style-id of the image.
function addImage(s, cid, fid, sid) {
	
	var c = document.createElement("canvas");
	var x = c.getContext("2d");
	c.height = c.width = +s;
	
	// if(count < threshold) {
	// 	bb.appendChild(c);
	// 	count++;
	// }
	
	x.font = `${styles[sid]} ${s}px ${fonts[fid]}`;
	x.fillStyle = "#000";
	x.textBaseline = "top";
	x.fillText(prnt[cid], 0, 0);

	var name = `${cid}-${s}-${fid}-${sid}.${ext}`;
	zip.file(name, c.toDataURL().substr(c.toDataURL().indexOf(',')+1), {base64: true});
}

function addIndexFiles() {
	
	var rstr = `\
There is a file-naming convention for image files. Each of them is named as
cid-s-fid-sid.png
where :
	cid : character id of the character in the image [charcterindex.txt]
	s   : size of image in pixels. [implicit in image name]
	fid : font-id of the text. [fontsindex.txt]
	sid : style-id of the image. [stylesindex.txt]
values for ids can be found in the respective files which are delimited
by a '\\n' and are 0 indexed. The filenames mentioned above `;

	zip.file("README.txt", rstr);

	var fstr = "";
	for (var i = 0; i < fonts.length; i++) fstr += fonts[i] + "\n";
	zip.file("fontsindex.txt", fstr);

	var sstr = "";
	for (var i = 0; i < styles.length; i++) sstr += styles[i] + "\n";
	zip.file("stylesindex.txt", sstr);

	var cstr = "";
	for (var i = 0; i < prnt.length; i++) cstr += prnt[i] + "\n";
	zip.file("charcterindex.txt", cstr);
}

function genzip() {
	count = 0;
	var zipname = g("zipname").value;
	if(zipname == "") {
		zipname = `dataset-${(new Date()).toLocaleString().replace(/\//g, "-")}.zip`;
	}
	styles = getfstyles();
	addIndexFiles();
	for (var i = 0; i < fonts.length; i++) {
		for (var j = 0; j < fsizes.length; j++) {
			for (var k = 0; k < styles.length; k++) {
				for (var l = 0; l < prnt.length; l++) {
					addImage(fsizes[j], l, i, k);
				}
			}
		}
	}
	zip.generateAsync({type:"blob"}).then(function(content) {
		saveAs(content, zipname);
	});
}
