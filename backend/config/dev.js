module.exports = {
	port: process.env.PORT,
	db: {
		url: process.env.DEV_DB_URL,
	},
	jwt: {
		secret: process.env.MYPROSHOP_DEV_JWT_SECRET,
		expire: process.env.MYPROSHOP_DEV_JWT_EXPIRE,
	},
};
