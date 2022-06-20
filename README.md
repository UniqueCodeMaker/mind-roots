# Run this Project 

Download or Pull this Project .
than >> open >> cmd >> Type "npm install"
than Check if modules folder created or not.
if Created than Run below command.
>> npm install 

# you  must have node and npm install to Run this Project...

>>Your project will be open in browser make sure you have chrome install for better  User Interface experiance.


Add this sql queries before starting this project

userprofiles

CREATE TABLE `mind-roots-club`.`UserProfiles` ( `id` INT(50) NOT NULL ,  `name` VARCHAR(50) NULL ,  `email` VARCHAR(50) NULL ,  `mobile` INT(50) NULL ,  `dob` DATE NULL ,  `gender` VARCHAR(50) NULL ,  `password` VARCHAR(50) NULL ,  `transaction` FLOAT(50) NULL ) ENGINE = InnoDB;
///////////////////////////////////////
AddEvent

CREATE TABLE `mind-roots-club`.`Addevent` ( `eventlead` VARCHAR(50) NOT NULL ,  `eventname` VARCHAR(50) NOT NULL ,  `eventdate` DATE NOT NULL ,  `eventlocation` VARCHAR(50) NOT NULL ,  `eventtiming` TIME(6) NOT NULL ,  `eventbudget` FLOAT(50) NOT NULL ,  `fessamount` FLOAT(50) NOT NULL ) ENGINE = InnoDB;
