import jwt from "jsonwebtoken";

export function check(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ title: "user unauthorized", message: "ראשית בצע כניסה" });
    }

    try {
        const tokenWithoutBearer = token.replace('Bearer ', '');
        let result = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);
        req.u = result;
        next();
    } catch (err) {
        console.error("שגיאה באימות טוקן:", err);
        return res.status(401).json({ title: "user unauthorized", message: "טוקן לא תקין או פג תוקף" });
    }
}

export function checkManager(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ title: "user unauthorized", message: "ראשית בצע כניסה" });
    }

    try {
        const tokenWithoutBearer = token.replace('Bearer ', '');
        let result = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);
        req.u = result;
        if (result.role === "ADMIN") {
            return next();
        }
        return res.status(403).json({ title: "user unauthorized", message: "אין לך הרשאה לבצע פעולה זו" });
    } catch (err) {
        console.error("שגיאה באימות טוקן:", err);
        return res.status(401).json({ title: "user unauthorized", message: "טוקן לא תקין או פג תוקף" });
    }
}