# 🌍 Travel Buddy

![Travel Buddy Banner](https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

Travel Buddy is a full-stack web application inspired by Airbnb, designed to help users discover, list, and review incredible travel destinations and properties. Whether you are looking for an iconic city stay, a relaxing beach house, or a quiet mountain dome, Travel Buddy makes it easy to find and book your next adventure!

## ✨ Key Features

- **User Authentication & Authorization**: Secure signup, login, and logout functionalities utilizing `passport.js`. Users can only edit or delete properties and reviews they own.
- **Dynamic Property Listings**: Add, edit, and manage travel listings complete with high-quality images uploaded securely to **Cloudinary**.
- **Interactive Maps**: Real-time geocoding and map rendering for property locations using the **MapTiler API**.
- **Category Filtering**: A beautiful, mobile-friendly horizontally scrolling filter bar (Trending, Rooms, Mountains, Castles, Camping, etc.) to quickly find specific types of stays.
- **Real-Time Tax Calculator**: A sleek UI toggle that instantly calculates and updates the displayed pricing to include standard 18% GST without reloading the page.
- **Review & Rating System**: Users can leave 1-to-5 star ratings and written reviews on properties.
- **Fully Responsive Design**: A "mobile-first" user interface built with Bootstrap and custom CSS, ensuring a perfect experience on laptops, tablets, and smartphones.

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5 / CSS3
- JavaScript (Vanilla)
- [Bootstrap 5](https://getbootstrap.com/) for grid and responsive components
- [EJS](https://ejs.co/) (Embedded JavaScript) for templating
- [FontAwesome](https://fontawesome.com/) for icons

**Backend:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/) for the server
- [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/) for database modeling
- [Passport.js](https://www.passportjs.org/) for secure local authentication
- [Joi](https://joi.dev/) for server-side data validation

**External APIs & Services:**
- [Cloudinary](https://cloudinary.com/) (Image storage and optimization)
- [MapTiler](https://www.maptiler.com/) (Interactive maps and geocoding)
- MongoDB Atlas (Cloud database hosting)

---

## 🚀 How to Run Locally

Want to test Travel Buddy on your own machine or contribute to the code? Follow these steps!

### 1. Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [Git](https://git-scm.com/)
- A local MongoDB server running, or a MongoDB Atlas connection string.

### 2. Clone the Repository
Open your terminal and clone this repository to your local machine:
```bash
git clone <your-repository-url>
cd travel-buddy
```

### 3. Install Dependencies
Install all the required Node packages:
```bash
npm install
```

### 4. Setup Environment Variables
Create a file named `.env` in the root directory of the project. You will need to create free accounts on Cloudinary, MapTiler, and MongoDB Atlas to get your API keys.

Add the following variables to your `.env` file:
```env
# Cloudinary Credentials for image uploads
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# MapTiler API Key for maps and geocoding
MAPS_API_KEY=your_maptiler_api_key

# Database and Session Secrets
ATLASDB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/travelbuddy
SECRET=your_super_secret_session_string
```

### 5. Run the Application
Start the Node server:
```bash
node app.js
# Or if you have nodemon installed:
# nodemon app.js
```

Once the server is running, open your browser and navigate to:
**[http://localhost:8080](http://localhost:8080)**

---

## 📸 Screenshots

*(You can replace these placeholders with actual screenshots of your app!)*

- **Homepage & Filters**: Beautifully responsive grid layout with a mobile-friendly horizontal filter row.
- **Interactive Maps**: Every listing automatically geocodes the address and displays an interactive map marker.
- **Tax Toggle**: Instantly see exactly what you'll pay with a simple switch.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
