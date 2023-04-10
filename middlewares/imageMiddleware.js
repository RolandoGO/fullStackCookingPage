


// Middleware function for handling image uploads

const imageMiddleware = (req, res, next) => {

    if (req.files) {
        //destructurin from req.files coming form the express-fileupload in app.js
        const { data, mimetype } = req.files.image

        //check if image, data an files exist
        if (!req.files.image || !data || !mimetype.startsWith('image/')) {

            return res.status(400).json({ error: 'Only images are allowed.' });
        }
        //check format of image
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!allowedTypes.includes(mimetype)) {
            return res.status(400).json({ error: 'Only JPEG, JPG, and PNG images are allowed.' });
        }


        next();
    }

    // if there is no image file, pass to the controler without one
    next()

};



module.exports = imageMiddleware;