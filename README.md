# Leafy
> Discovery: From Leaf to Tree. You find a leaf and we'll do the rest!

Leafy is a full stack, MERN application that identifies user submitted leaves. A user may post a picture of a leaf that they've come across and Leafy will perform image recognition analysis on the image to identify what species of tree to which the leaf belongs. Currently, Leafy serves as a minimum viable product / proof of concept as it is able to seamlessly identify a select quantity of trees (e.g., Eastern redbud, Ginkgo, Pine, Southern Magnolia, and Swamp White Oak) focalized around the Washington, D.C. region. It is our intention to continue to train the image recognition analysis engine to identify a greater variety of species in our local area, then exapnd into additional regions. 

If you'd like to contribute to our efforts, we are actively looking for contributors to help us expand our identification capabilities! To do so, just submit a .zip file comprising 25-30 images of your particular tree species in .jpg/.png format with a minimum resolution of 250 x 250 px. Please name your .zip file with the following semantic convention and specify the common name of the tree (e.g., american_sycamore.zip, ginkgo.zip, swamp_white_oak.zip, etc.) and we'll handle retraining our image recognition analysis engine.

## Tech

On the front-end, Leafy is driven by React and interfaces with a Node/Express server and Mongo database. In order to enable user image submission, we used react-cropper to allow users to create base64 square croppings of their image. We then generate a .jpg image file from the base64 cropping, which is submitted to the server. Doing so had the dual benefit of standardizing image dimensions for rendering purposes later on and also reducing image file size for upload. 

At the server, the user submitted image is stored in an AWS S3 bucket. The path to the AWS stored image is then sent to a custom-trained IBM Watson visual recognition instance for analysis. Upon analysis completion from Watson, a database insert is made capturing the AWS path, Watson results, and metadata corresponding to the image such as name, scientific name, and range image path information. 

  https://aframe.io/
  
  https://github.com/jeromeetienne/AR.js/blob/master/README.md

## Gameplay Instructions

In order to play xoAR in AR mode, the Hiro AR marker provided under the oxAR "AR Marker" window needs to be utilized. 

For example, on a first computing device, maybe your deskptop/laptop, pull up the Hiro AR Marker. On a second computing device such as your mobile phone, pull up the xoAR "AR Tic-Tac-Toe" window. Upon doing so, you will be asked if xoAR can use your camera - select OK - then point your camera at the Hiro AR Marker on the first computing device. The AR Tic-Tac-Toe gameboard will be rendered on your mobile device! You can then touch the rendered AR planes in order to make your move. 

Such steps may also be inverted so you can play on your desktop/laptop while providing the Hiro AR Marker from your mobile device.

## Gameplay Photos

Mobile

<img width="556" alt="screen shot 2018-05-25 at 11 05 21 am" src="https://user-images.githubusercontent.com/37127765/40551655-977938d4-600b-11e8-8540-66a1b58bfc7e.png">

<img width="649" alt="screen shot 2018-05-25 at 11 07 50 am" src="https://user-images.githubusercontent.com/37127765/40551804-f499a5f8-600b-11e8-904e-fa17734012a2.png">

Laptop

<img width="1435" alt="screen shot 2018-05-25 at 10 56 13 am" src="https://user-images.githubusercontent.com/37127765/40551401-cda65028-600a-11e8-8461-75bf6261b70a.png">
  
## Link

Visit on GitHub:

```sh
https://nchenari.github.io/ar-tic-tac-toe/index.html
```

## Contributing

1. Fork it (<https://github.com/nchenari/ar-tic-tac-toe>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request



Collapse 
