FROM php:8.2-apache
# تفعيل إضافات قاعدة البيانات لو مشروعك يستخدم MySQL
RUN docker-php-ext-install pdo pdo_mysql mysqli
# نسخ ملفات المشروع إلى مسار السيرفر الافتراضي
COPY . /var/www/html/
# إعطاء الصلاحيات المناسبة للملفات
RUN chown -R www-data:www-data /var/www/html
EXPOSE 80
