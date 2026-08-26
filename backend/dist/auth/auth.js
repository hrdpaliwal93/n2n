import jwt, {} from 'jsonwebtoken';
export default function Auth(req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.json({ message: "token required!", success: false });
            return;
        }
        const decodeddata = jwt.verify(token, "thismyjsownwentokensecret");
        if (!decodeddata) {
            res.json({ message: "invalid or expired token", success: false });
            return;
        }
        req.id = decodeddata.id;
        next();
    }
    catch (e) {
        console.error(e.message);
    }
}
//# sourceMappingURL=auth.js.map