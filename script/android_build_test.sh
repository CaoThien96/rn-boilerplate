cp -rf config/android_config_test/logo/ android/app/src/main/res/
cp -rf config/android_config_test/splash_screen/ android/app/src/main/res/drawable/

# Update app name
nextName='Dev'
currentName='Boilerplate'
sed -i -e "s/$currentName/$nextName/g" android/app/src/main/res/values/strings.xml
rm -f android/app/src/main/res/values/strings.xml-e