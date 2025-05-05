## Live 

Projektet är deployat och finns live på https://training-app-uczr.onrender.com/
 
Backend delen hittar ni här: https://github.com/MrMoha93/training_app_backend

## Features

- Database Relations – Prisma modeller med relationer mellan users, reviews och exercises.
- Supabase – PostgreSQL hosting via Supabase.
- CRUD Operations - Skapa, hämta, uppdatera och radera övningar. 
- Restful API - Endpoints för bl.a. övningar, användare, recensioner och bilder via Cloudinary.
- User Authentication – Registrering, inloggning och tokens (JWT).
- Protected Routes – Sidor tillgängliga endast för inloggade användare.
- Middleware Protection – Endpoints skyddas via middleware för auth och admin.
- Data Validation - Både på backend och på frontend med Zod + react-hook-form.
- Responsive Design – Anpassad för både desktop och mobil med TailwindCSS + DaisyUI.
- Search Input – Sök bland övningar.
- Sorting - Baserat på datum.
- Pagination - Antal övningar per sida. 
- Sets - Lägg till sets för varje övning.
- Exercise Info Pages – Visa beskrivning, betyg och kommentarer för kända övningar.
- Post Reviews – Användare kan lämna betyg och kommentarer på övningar.
- Conditional UI – Endast den som postat en recension (eller admin) kan ta bort den.
- User Display – Visar inloggad användares namn i navbaren.

## Pages

- Registration Page - Registreringssidan. 
- Login Page - Inloggningssidan. 
- Exercises - Renderar befintliga övningar sparade i databasen samt möjligheten till att skapa, radera eller uppdatera en övning. 
- Exercise - Detaljsida för varje övning, innehåller övningens namn, datum och sets.
- Exercises Info - En lista över välkända övningar som bl.a. innehåller en kortfattad beskrivning, ett kommentarsfält och betygsättning. 
- Exercise Info - Detaljsidan för en "Exercise Info övning". 
