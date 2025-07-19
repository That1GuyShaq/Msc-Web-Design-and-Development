# Msc-Web-Design-and-Development

**Artifact:** Multi-tenant SaaS for personal-care formulators  
**Stack:** Laravel 12, React, PostgreSQL, Spatie Multitenancy  

---

## Table of Contents

1. [Features](#features)  
2. [Getting Started](#getting-started)  
3. [Environment Variables](#environment-variables)  
4. [Database Setup](#database-setup)  
5. [Seeding & Factories](#seeding--factories)  
6. [Running the App](#running-the-app)  
7. [Testing](#testing)  
8. [API Endpoints](#api-endpoints)  
9. [Known Issues](#known-issues)  
10. [License](#license)  

---

## Features

- Multi-tenant support (Spatie Multitenancy)  
- Full CRUD for Suppliers, Ingredients, Formulas  
- Formula versioning & archiving  
- Central “world” data (countries, states, cities)  
- React front-end with Shad/cn Tailwind UI  

---

## Getting Started

1. **Clone & cd**  
```bash
git clone https://github.com/That1GuyShaq/Msc-Web-Design-and-Development.git
cd Msc-Web-Design-and-Development
composer install
npm install
php artisan key: generate
```
## Environment Variables

- Set your values:  
```php
APP_URL=http://localhost:8000  
DB_CONNECTION=pgsql  
DB_HOST=127.0.0.1  
DB_PORT=5432  
DB_DATABASE=your_database
DB_USERNAME=your_user  
DB_PASSWORD=your_password
```
## Database Setup

1. Migrate:  
```bash
php artisan migrate
```

2. Seed “world” data:  
```bash
php artisan db:seed --class=WorldSeeder
```
3. Seed application data:
```bash  
php artisan db:seed
```
## Seeding & Factories

- Factory fix: ensure city/state/country line up. See SupplierFactory in database/factories.
```php
// in SupplierFactory.php
$city = DB::connection('central')->table('cities')->inRandomOrder()->first();
return [
  'city'            => $city->name,
  'state_province'  => DB::connection('central')->table('states')->where('id', $city->state_id)->value('name'),
  'country'         => DB::connection('central')->table('countries')->where('id', $city->country_id)->value('name'),
  // …other fields…
];

```

## Running the App

- Serve the Laravel backend:  
```bash
php artisan serve
```
- Watch & compile React front-end:  
```bash
npm run dev  
```
Visit http://localhost:8000

## Testing

- Run your PHPUnit feature tests:  
php artisan test

## API Endpoints


## API Endpoints

> All tenant-scoped routes require authentication. Prefix each path with your tenant domain or subdirectory (e.g. `https://your-app.com/{tenant}/…`).

---

### Authentication & Dashboard

| Method | URI          | Action                    | Route Name         |
|--------|--------------|---------------------------|--------------------|
| GET    | `/`          | Render welcome page       | _none_             |
| GET    | `/dashboard` | Render dashboard          | `dashboard`        |
| POST   | `/logout`    | Log out current user      | `tenant.logout`    |

---

### Formulas

| Method | URI                                           | Action                       | Route Name                            |
|--------|-----------------------------------------------|------------------------------|---------------------------------------|
| GET    | `/formulation/formulas`                       | List all formulas            | `formulation.formulas.index`          |
| GET    | `/formulation/formulas/create`                | Show “create formula” form   | `formulation.formulas.create`         |
| POST   | `/formulation/formulas`                       | Store new formula            | `formulation.formulas.store`          |
| GET    | `/formulation/formulas/{formula}`             | Show a single formula        | `formulation.formulas.show`           |
| GET    | `/formulation/formulas/{formula}/edit`        | Show “edit formula” form     | `formulation.formulas.edit`           |
| PUT    | `/formulation/formulas/{formula}`             | Update an existing formula   | `formulation.formulas.update`         |
| DELETE | `/formulation/formulas/{formula}`             | Delete a formula             | `formulation.formulas.destroy`        |
| PUT    | `/formulation/formulas/{formula}/archive`     | Archive a formula            | `formulation.formulas.archive`        |
| PUT    | `/formulation/formulas/{formula}/version`     | Create a new formula version | `formulation.formulas.version`        |

#### Formula Notes

| Method | URI                                                  | Action                      | Route Name                            |
|--------|------------------------------------------------------|-----------------------------|---------------------------------------|
| GET    | `/formulation/formulas/{formula}/notes/create`       | Show “add notes” form       | `formulation.formula.notes.create`    |
| GET    | `/formulation/formulas/{formula}/notes/edit`         | Show “edit notes” form      | `formulation.formula.notes.edit`      |
| PUT    | `/formulation/formulas/{formula}/notes`              | Update notes for a formula  | `formulation.formula.notes.update`    |

---

### Formula Phases

| Method | URI                                                    | Action                     | Route Name                              |
|--------|--------------------------------------------------------|----------------------------|-----------------------------------------|
| GET    | `/formulation/formulas/{formula}/phases/create`        | Show “add phase” form      | `formulation.formula.phases.create`     |
| GET    | `/formulation/formulas/{formula}/phases/edit`          | Show “edit phase” form     | `formulation.formula.phases.edit`       |
| POST   | `/formulation/formulas/{formula}/phases`               | Store new phase            | `formulation.formula.phases.store`      |
| PUT    | `/formulation/formulas/{formula}/phases`               | Update an existing phase   | `formulation.formula.phases.update`     |

---

### Formula Methods

| Method | URI                                                      | Action                      | Route Name                              |
|--------|----------------------------------------------------------|-----------------------------|-----------------------------------------|
| GET    | `/formulation/formulas/{formula}/methods/create`         | Show “add method” form      | `formulation.formula.methods.create`    |
| GET    | `/formulation/formulas/{formula}/methods/edit`           | Show “edit method” form     | `formulation.formula.methods.edit`      |
| POST   | `/formulation/formulas/{formula}/methods`                | Store new method            | `formulation.formula.methods.store`     |
| PUT    | `/formulation/formulas/{formula}/methods`                | Update an existing method   | `formulation.formula.methods.update`    |

---

### Ingredients

| Method    | URI                                        | Action                              | Route Name                          |
|-----------|--------------------------------------------|-------------------------------------|-------------------------------------|
| GET       | `/inventory/ingredients`                   | List ingredients                    | `inventory.ingredients.index`       |
| GET       | `/inventory/ingredients/create`            | Show “create ingredient” form       | `inventory.ingredients.create`      |
| POST      | `/inventory/ingredients`                   | Store new ingredient                | `inventory.ingredients.store`       |
| GET       | `/inventory/ingredients/{ingredient}`      | Show ingredient details             | `inventory.ingredients.show`        |
| GET       | `/inventory/ingredients/{ingredient}/edit` | Show “edit ingredient” form         | `inventory.ingredients.edit`        |
| PUT/PATCH | `/inventory/ingredients/{ingredient}`      | Update an ingredient                | `inventory.ingredients.update`      |
| DELETE    | `/inventory/ingredients/{ingredient}`      | Delete an ingredient                | `inventory.ingredients.destroy`     |
| PATCH     | `/inventory/ingredients/{ingredient}/restore`     | Restore a soft-deleted ingredient    | `inventory.ingredients.restore`     |
| DELETE    | `/inventory/ingredients/{ingredient}/force-delete` | Permanently delete an ingredient     | `inventory.ingredients.force_delete`|

---

### Suppliers

| Method    | URI                                    | Action                            | Route Name                         |
|-----------|----------------------------------------|-----------------------------------|------------------------------------|
| GET       | `/inventory/suppliers`                 | List suppliers                    | `inventory.suppliers.index`        |
| GET       | `/inventory/suppliers/create`          | Show “create supplier” form       | `inventory.suppliers.create`       |
| POST      | `/inventory/suppliers`                 | Store new supplier                | `inventory.suppliers.store`        |
| GET       | `/inventory/suppliers/{supplier}`      | Show supplier details             | `inventory.suppliers.show`         |
| GET       | `/inventory/suppliers/{supplier}/edit` | Show “edit supplier” form         | `inventory.suppliers.edit`         |
| PUT/PATCH | `/inventory/suppliers/{supplier}`      | Update a supplier                 | `inventory.suppliers.update`       |
| DELETE    | `/inventory/suppliers/{supplier}`      | Delete a supplier                 | `inventory.suppliers.destroy`      |

#### Supplier–Ingredient Management

| Method | URI                                                               | Action                                  | Route Name                                  |
|--------|-------------------------------------------------------------------|-----------------------------------------|----------------------------------------------|
| POST   | `/inventory/suppliers/{supplier}/ingredients/store`               | Add an ingredient to a supplier         | `inventory.suppliers.ingredients.store`      |
| PUT    | `/inventory/suppliers/{supplier}/ingredients/update/{ingredient}` | Update a supplier’s ingredient details  | `inventory.suppliers.ingredients.update`     |
| DELETE | `/inventory/suppliers/{supplier}/ingredients/delete/{ingredient}` | Remove an ingredient from a supplier    | `inventory.suppliers.ingredients.destroy`    |
| PATCH  | `/inventory/suppliers/{supplier}/restore`                         | Restore a soft-deleted supplier         | `inventory.suppliers.restore`                |
| DELETE | `/inventory/suppliers/{supplier}/force-delete`                    | Permanently delete a supplier           | `inventory.suppliers.force_delete`           |


## Known Issues




## License

© 2025 Shaquille Daniel.

This software and its documentation are provided **solely for the use of UNICAF University** in fulfilment of the requirements for the  
MSc Web Design and Development final project. All rights not expressly granted herein are reserved.

*You may copy and run this code only within the context of UNICAF University coursework. Any other use, redistribution, or derivative work is prohibited without the author’s permission.*

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQwMDczMDAyMV19
-->