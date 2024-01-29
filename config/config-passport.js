import passport from "passport";
import passportJWT from "passport-jwt";
import { contact } from "../app.mjs";

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
    secretOrKey: process.env.SECRET,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
    new Strategy(params, function (payload, done) {
        contact
            .find({ _id: payload.id })
            .then(([user]) => {
                if (!user) {
                    return done(new Error("User not found"));
                }
                return done(null, user);
            })
            .catch((error) => done(error));
    })
);
