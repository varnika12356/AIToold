exports.getAllUser = async (req, res) => {

  
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const searchQuery = {
      $or: [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phoneNumber: { $regex: search, $options: "i" } },
      ],
    };

    const query = search ? searchQuery : {};

    const users = await UserModel.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalUsers = await UserModel.countDocuments(
      search ? searchQuery : {}
    );

    res.json({
      data: users,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};