const Contact = require("../schema/contact");

//@desc   Create Contact
//@route  POST /createcontact
//@access Private
const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (
      (!name && name === " ") ||
      (!email && email === " ") ||
      (!message && message === " ")
    ) {
      throw new Error("Please Add All Fields");
    }

    const contactData = new Contact({ name, email, message });
    await contactData.save();
    res.json({ message: "Contact form submitted successfully!" });
  } catch (error) {
    console.error("Error saving contact form submission:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

//@desc   Get Contact
//@route  GET /contacts
//@access Private
const getAllContacts = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const rows = req.query.rows || 10;

    const query = {};

    const total = await Contact.countDocuments();

    const pages = Math.ceil(total / rows) || 1;

    if (page > pages) {
      res.status(400);
      throw new Error("Page limit exceeded!");
    }
    const startIdx = (page - 1) * rows;

    const results = { total, pages, page, result: [] };
    results.result = await Contact.find()
      .sort({ _id: -1 })
      .skip(startIdx)
      .limit(rows)
      .lean();

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//@desc   Get Contact
//@route  GET /contacts/:id
//@access Private
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  submitContactForm,
  getAllContacts,
  getContactById,
};
