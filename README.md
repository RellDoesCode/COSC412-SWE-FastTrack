# COSC412_Group_Sprints
# Project Name 
TU Course Pathfinder
# Project Members
Eric Pattmon, Thomas Rambo, Eason Zou, Ebenezer Ajisafe, Terrell Beasley, Juan Abreu
# Directions For Running Project
1) **Please note, the API keys are private and will be changed into commented API keys after May 20th to ensure no breech of privacy**
2) **OPENAI DOES NOT ALLOW KEYS TO BE SHARED ON GITHUB, THUS THE OPENAI KEY YOU SEE IN THE CODE IS DISABLED DUE TO OPENAI POLICIES**
3) **IN ORDER TO REPLACE THE OPENAI API KEY GO TO THE FOLLOWING AND PUT YOUR OWN...**
4) https://platform.openai.com/settings/organization/api-keys
5)   Line 85 in serverr.js, replace the key in the quotes
6)   the whole key in .env file
7)   The developers are using gpt-4o-mini, depending on the version you are able to get you must change this code accoringly (gpt-3.5, etc)
   
   ![image](https://github.com/user-attachments/assets/44499f0c-2a64-406d-a77e-350b7e9e35a7)


<br>

1) **For google maps api do the following**
2) Get your key (The one in the code works but will be changed after may 20th)
   https://console.cloud.google.com/apis/credentials/key/b3717bb3-57aa-4194-b52d-d558f64273a7?authuser=2&project=directed-sun-456519-t8
3) Change the key in line 171 of the home html file
   
![image](https://github.com/user-attachments/assets/bc3a090f-01dd-43fd-9f88-66780ef84d51)

4) Enable all of these for your google maps created API
<br>

![image](https://github.com/user-attachments/assets/d8b15148-f1d5-4b19-9a7e-dd74138af575)

<br>

1) The mongoDB database we are using is from the following (subjected to get commented out after may 20th) 

2) Download mongodb extension for vs code and hit connect and put this in the field

mongodb+srv://ericP:JEIZH4iHM99fWU0Z@cluster0.q8meogj.mongodb.net/

2) Ensure you are using the MongoDB database extension to be able add it.

**After fixing the API key Issues**
1) First off ensure all the files in the project folder are in one folder
![image](https://github.com/user-attachments/assets/2cdc48c8-9232-4159-aafb-911235527a8e)
3) Then open up your vs code terminal and cd into the project folder
![image](https://github.com/user-attachments/assets/17f480d7-2e88-4820-8d42-dc4edd99d9e0)

5) After such, run 'npm install' to install all needed packages
![image](https://github.com/user-attachments/assets/ba7eef4f-b2d8-46c3-974d-8df882b1395d)

7) After all packages are installed run 'npm run dev' in terminal
  ![image](https://github.com/user-attachments/assets/a4a98e39-2825-42a0-8c85-4d8e7348cd9d)

**This is the expected message**

![image](https://github.com/user-attachments/assets/8c2b16c7-39e7-46de-be33-4b8fcd09be03)

9) Go to localhost:3500/home and that is the project
10) If it doesnt work, it could be due to fact of malfunctioning in node_modules folder
