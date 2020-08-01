// Kata link: https://www.codewars.com/kata/537e18b6147aa838f600001b/javascript
/* 
   Usage example: justify("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae hendrerit felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar neque ac sapien eleifend auctor. Phasellus eget lorem eu nibh accumsan tincidunt. Integer nisi arcu, consectetur at hendrerit eu, rhoncus vitae quam. In hac habitasse platea dictumst. Fusce consequat accumsan tellus, vitae pretium risus lobortis in. Duis aliquet efficitur ex, et luctus tellus imperdiet ac. Donec consectetur iaculis dolor sed dapibus. Fusce pharetra purus a pretium faucibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean aliquet ipsum sit amet mi tincidunt pretium. Aenean imperdiet mauris iaculis massa consequat accumsan. Ut ac lorem nec lacus tempus faucibus. ", 35);
   Output example:
   
   Lorem   ipsum   dolor   sit   amet,
   consectetur  adipiscing elit. Morbi
   vitae  hendrerit felis. Lorem ipsum
   dolor    sit    amet,   consectetur
   adipiscing    elit.    Pellentesque
   pulvinar  neque  ac sapien eleifend
   auctor.  Phasellus  eget  lorem  eu
   nibh  accumsan  tincidunt.  Integer
   nisi arcu, consectetur at hendrerit
   eu,  rhoncus  vitae  quam.  In  hac
   habitasse  platea  dictumst.  Fusce
   consequat  accumsan  tellus,  vitae
   pretium  risus  lobortis  in.  Duis
   aliquet  efficitur  ex,  et  luctus
   tellus    imperdiet    ac.    Donec
   consectetur   iaculis   dolor   sed
   dapibus.  Fusce  pharetra  purus  a
   pretium   faucibus.   Interdum   et
   malesuada   fames   ac  ante  ipsum
   primis  in faucibus. Aenean aliquet
   ipsum   sit   amet   mi   tincidunt
   pretium.  Aenean  imperdiet  mauris
   iaculis  massa  consequat accumsan.
   Ut   ac   lorem  nec  lacus  tempus
   faucibus. 
   
*/

function justify (str, len) {
  let lines = [[]];
  
  str.split(" ").forEach(function (word) { //split words into lines of desired length
    let i = lines.length - 1;
    if ([...lines[i], word].join(" ").length <= len) { // add words to line until len
      lines[i].push(word);
    } else {
      lines[i + 1] = [word]; // create new line if length threshold has been reached
    }
  });
  
  return lines.map(function (e, i) { // adding whitespaces to all lines
    if (i === lines.length - 1 || e.length === 1) return e.join(" "); // don't justify if end line or 1 word
    
    let j = 0;
    while (e.join("").length < len) {
      e[j] += " ";
      if (j === e.length - 2) j = 0; else j++;
    }
    return e.join("");
  }).join("\n");
}