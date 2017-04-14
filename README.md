# ocrimgen
This project was built for generating dataset for training our neural-network in mpocr project.

### To use this product (Don't skip the last step).

* Download the zip file or clone the repo from terminal.
	> `git clone https://github.com/mmpataki/ocrimgen`
* open the index.html file in the browser.
	> `cd ocrimgen`  
	> `firefox index.html  #use your browser name`
* Add different font-families, sizes and styles of the character images you want.
* Press "Generate" and wait for a while the script generates a zip file and creates a link for you to download.
* Your browser may even complain of unresponsive script but allow the script to continue and be patient.
* Download the zip file and extract it somewhere you want.
* Read the README.txt file and use the images.

### Naming conventions
#### The image file names follow a pattern which is explained below.

Each of the image is named as  
> `cid-s-fid-sid.png`  

where :  
* `cid` : character id of the character in the image [charcterindex.txt]
* `s`   : size of image in pixels. [implicit in image name]
* `fid` : font-id of the text. [fontsindex.txt]
* `sid` : style-id of the image. [stylesindex.txt]
values for ids can be found in the respective files which are delimited
by a '\\n' and are 0 indexed. The filenames mentioned above

### About the images.
* Each image is of size `s x s`. `s` feild is explained in above section.
* The `foreground` used is `black` and `background` is `black`.
