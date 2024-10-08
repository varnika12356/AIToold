const Footer = require("../schema/footerModel");

//@desc   Create Footer
//@route  POST /createfooter
//@access Private
const createFooter = async (req, res) => {
  try {
    const {
      Image,
      websiteTitle,
      websiteAbout,
      subscribeAbout,
      gmailUrl,
      facebookUrl,
      twitterUrl,
      instagramUrl,
      linkedinUrl,
      copyRight,
    } = req.body;

    const newFooter = new Footer({
      image: Image,
      website_Title: websiteTitle,
      website_About: websiteAbout,
      subscribe_About: subscribeAbout,
      gmail_Url: gmailUrl,
      facebook_Url: facebookUrl,
      twitter_Url: twitterUrl,
      instagram_Url: instagramUrl,
      linkedin_Url: linkedinUrl,
      copy_Right: copyRight,
    });

    const footer = await newFooter.save();
    res.status(201).json(footer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//@desc   Get Footer
//@route  GET /getfooter 
//@access Private
const getFooter = async (req, res) => {
  try {
    const footers = await Footer.find();
    console.log(footers)
    res.status(200).json(footers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//@desc   Update Footer
//@route  PUT /updatefooter/:id
//@access Private
const updateFooter = async(req,res) =>{
  try {
    const data = await Footer.findByIdAndUpdate(req.params.id, {
      $set : req.body,
    })

    if (!data) {
      return res.status(404).json({ message: 'Footer not found' });
    }
    res.status(200).json(data)
    
  } catch (error) {
    console.log(error);
    
  }
}

module.exports = {
  createFooter,
  getFooter,
  updateFooter,
};

