import passport from "passport";

export const auth = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (error, user) => {
        try {
            if (error || !user) {
                return res.status(401).json({
                    status: "error",
                    code: 401,
                    message: "Unauthorized",
                    data: "Unauthorized",
                });
            }

            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    })(req, res, next);
};
