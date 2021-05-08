cp -rf config/android_config_fdao_beta/logo/* android/app/src/main/res/
cp -rf config/android_config_fdao_beta/splash_screen/* android/app/src/main/res/drawable/

# Update app name
nextName='Dev'
currentName='Boilerplate'
sed -i -e "s/$currentName/$nextName/g" android/app/src/main/res/values/strings.xml
rm -f android/app/src/main/res/values/strings.xml-e
# Update key store
cp -rf config/android_config_fdao_beta/key.jks android/app
# Update time update
nextName=$(date '+%Y-%m-%d %H:%M')
currentName='1.0'
sed -i -e "s/$currentName/$nextName/g" src/Config/index.js