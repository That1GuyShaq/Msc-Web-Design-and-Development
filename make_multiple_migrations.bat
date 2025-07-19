@echo off
for %%T in (formulas ingredients formula_versions formula_ingredient formula_tag attachments) do (
  php artisan make:migration create_%%T_table
)