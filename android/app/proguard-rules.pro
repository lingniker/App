# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
-keep class com.expensify.chat.BuildConfig { *; }
-keep, allowoptimization, allowobfuscation class expo.modules.** { *; }

# Added from auto-generated missingrules.txt to allow build to succeed
-dontwarn com.onfido.javax.inject.Inject
-dontwarn javax.lang.model.element.Element
-dontwarn javax.lang.model.type.TypeMirror
-dontwarn javax.lang.model.type.TypeVisitor
-dontwarn javax.lang.model.util.SimpleTypeVisitor7
-dontwarn net.sf.scuba.data.Gender
-dontwarn net.sf.scuba.smartcards.CardFileInputStream
-dontwarn net.sf.scuba.smartcards.CardService
-dontwarn net.sf.scuba.smartcards.CardServiceException
-dontwarn org.jmrtd.AccessKeySpec
-dontwarn org.jmrtd.BACKey
-dontwarn org.jmrtd.BACKeySpec
-dontwarn org.jmrtd.PACEKeySpec
-dontwarn org.jmrtd.PassportService
-dontwarn org.jmrtd.lds.CardAccessFile
-dontwarn org.jmrtd.lds.PACEInfo
-dontwarn org.jmrtd.lds.SecurityInfo
-dontwarn org.jmrtd.lds.icao.DG15File
-dontwarn org.jmrtd.lds.icao.DG1File
-dontwarn org.jmrtd.lds.icao.MRZInfo
-dontwarn org.jmrtd.protocol.AAResult
-dontwarn org.jmrtd.protocol.BACResult
-dontwarn org.jmrtd.protocol.PACEResult
-dontwarn org.spongycastle.jce.provider.BouncyCastleProvider