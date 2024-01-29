function current(req, res, next) {
    const dane = req.user;

    return res.status(200).json({
        status: "OK",
        code: 200,
        data: dane,
    });
}

export { current };
