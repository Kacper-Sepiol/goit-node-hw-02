function logout(req, res, next) {
    return res.status(204).json({
        status: "No Content",
        code: 201,
        data: "success",
    });
}

export { logout };
