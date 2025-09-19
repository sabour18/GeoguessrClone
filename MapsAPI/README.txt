
WHEN CHANGES MADE TO DATABASE, THIS IS HOW TO UPDATE MODELS
	1. Select MapsAPI as sole startup project
	2. In package manager console run:
		Scaffold-DbContext Name="DefaultConnection" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -force