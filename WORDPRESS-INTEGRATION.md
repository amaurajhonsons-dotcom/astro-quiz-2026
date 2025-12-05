# 🔌 WordPress इंटीग्रेशन गाइड

**अगर तुम्हारे पास पहले से WordPress साइट है, तो ये गाइड फॉलो करो।**

---

## 🎯 WordPress Setup (2 तरीके)

### Option A: Page Template (Easy)

#### 1. New Page बनाओ
```
WordPress Dashboard > Pages > Add New
Title: "2026 Astro Quiz"
```

#### 2. Custom HTML Block Add करो
```html
<!-- पूरा index.html का content यहां paste करो -->
<!-- लेकिन <head>, <body> tags हटा दो -->
<!-- सिर्फ <div class="quiz-container"> से शुरू करो -->
```

#### 3. CSS Add करो
```
Appearance > Customize > Additional CSS
(या)
Plugin: Simple Custom CSS

/* css/style.css की कॉपी पेस्ट करो */
```

#### 4. JS Add करो
```php
// थीम के functions.php में:
function enqueue_quiz_scripts() {
    if (is_page('2026-astro-quiz')) {
        wp_enqueue_script('quiz-main', get_template_directory_uri() . '/js/main.js', [], '1.0', true);
        wp_enqueue_script('quiz-engine', get_template_directory_uri() . '/js/quiz-engine.js', [], '1.0', true);
        wp_enqueue_script('viral-hooks', get_template_directory_uri() . '/js/viral-hooks.js', [], '1.0', true);
    }
}
add_action('wp_enqueue_scripts', 'enqueue_quiz_scripts');
```

---

### Option B: Plugin (Advanced)

#### 1. Custom Plugin बनाओ
```
wp-content/plugins/astro-quiz-2026/
├── astro-quiz-2026.php (main file)
├── includes/
│   ├── shortcodes.php
│   └── admin-settings.php
├── assets/
│   ├── css/
│   └── js/
└── templates/
    ├── quiz-landing.php
    └── quiz-page.php
```

#### 2. Main Plugin File
```php
<?php
/**
 * Plugin Name: AstroQuiz 2026
 * Description: Viral astrology quizzes with AI predictions
 * Version: 1.0
 * Author: Your Name
 */

// Prevent direct access
if (!defined('ABSPATH')) exit;

// Enqueue Scripts
function astroquiz_enqueue_assets() {
    wp_enqueue_style('astroquiz-style', plugin_dir_url(__FILE__) . 'assets/css/style.css', [], '1.0');
    wp_enqueue_script('astroquiz-main', plugin_dir_url(__FILE__) . 'assets/js/main.js', ['jquery'], '1.0', true);
    wp_enqueue_script('astroquiz-quiz', plugin_dir_url(__FILE__) . 'assets/js/quiz-engine.js', ['jquery'], '1.0', true);
    wp_enqueue_script('astroquiz-viral', plugin_dir_url(__FILE__) . 'assets/js/viral-hooks.js', ['jquery'], '1.0', true);
}
add_action('wp_enqueue_scripts', 'astroquiz_enqueue_assets');

// Shortcode: [astroquiz]
function astroquiz_landing_shortcode() {
    ob_start();
    include plugin_dir_path(__FILE__) . 'templates/quiz-landing.php';
    return ob_get_clean();
}
add_shortcode('astroquiz', 'astroquiz_landing_shortcode');

// Shortcode: [astroquiz_quiz id="love-match"]
function astroquiz_quiz_shortcode($atts) {
    $atts = shortcode_atts(['id' => 'love-match'], $atts);
    ob_start();
    include plugin_dir_path(__FILE__) . 'templates/quiz-page.php';
    return ob_get_clean();
}
add_shortcode('astroquiz_quiz', 'astroquiz_quiz_shortcode');

// Settings Page
function astroquiz_settings_menu() {
    add_menu_page(
        'AstroQuiz Settings',
        'AstroQuiz',
        'manage_options',
        'astroquiz-settings',
        'astroquiz_settings_page',
        'dashicons-chart-line'
    );
}
add_action('admin_menu', 'astroquiz_settings_menu');

function astroquiz_settings_page() {
    ?>
    <div class="wrap">
        <h1>🔮 AstroQuiz Settings</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('astroquiz_settings');
            do_settings_sections('astroquiz-settings');
            ?>
            <table class="form-table">
                <tr>
                    <th>OneSignal App ID</th>
                    <td><input type="text" name="astroquiz_onesignal_id" value="<?php echo get_option('astroquiz_onesignal_id'); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th>Adsterra Social Bar Key</th>
                    <td><input type="text" name="astroquiz_adsterra_social" value="<?php echo get_option('astroquiz_adsterra_social'); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th>Adsterra Popunder Key</th>
                    <td><input type="text" name="astroquiz_adsterra_popunder" value="<?php echo get_option('astroquiz_adsterra_popunder'); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th>OpenAI API Key</th>
                    <td><input type="text" name="astroquiz_openai_key" value="<?php echo get_option('astroquiz_openai_key'); ?>" class="regular-text" /></td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

function astroquiz_register_settings() {
    register_setting('astroquiz_settings', 'astroquiz_onesignal_id');
    register_setting('astroquiz_settings', 'astroquiz_adsterra_social');
    register_setting('astroquiz_settings', 'astroquiz_adsterra_popunder');
    register_setting('astroquiz_settings', 'astroquiz_openai_key');
}
add_action('admin_init', 'astroquiz_register_settings');
```

#### 3. Activate Plugin
```
WordPress Dashboard > Plugins > Activate "AstroQuiz 2026"
```

#### 4. Use Shortcodes
```
// Landing Page
[astroquiz]

// Specific Quiz
[astroquiz_quiz id="love-match"]
[astroquiz_quiz id="money-luck"]
```

---

## 🔧 Theme Integration

### GeneratePress (Recommended)

#### 1. Install Theme
```
Appearance > Themes > Add New
Search: "GeneratePress"
Install + Activate
```

#### 2. Elements (GP Premium)
```
Appearance > Elements > Add New
Type: Block
Location: Entire Site
Display Rules: Everywhere

<!-- HTML Content -->
<div id="astroquiz-container"></div>
```

#### 3. Hooks
```php
// functions.php
add_action('generate_before_header', function() {
    // Adsterra Social Bar
    echo file_get_contents(get_template_directory() . '/includes/adsterra-ads.html');
});
```

---

### Elementor Integration

#### 1. Install Elementor
```
Plugins > Add New > "Elementor"
```

#### 2. Create Page
```
Pages > Add New > Edit with Elementor
```

#### 3. Add HTML Widget
```
Elements > HTML
<!-- Paste index.html content -->
```

#### 4. Add Custom CSS
```
Elementor > Settings > Custom CSS
/* Paste style.css */
```

---

## 📊 WordPress-Specific Features

### 1. User Integration
```php
// Save quiz results to user meta
function save_quiz_result_to_user($user_id, $quiz_id, $result) {
    $results = get_user_meta($user_id, 'quiz_results', true) ?: [];
    $results[$quiz_id] = [
        'score' => $result['score'],
        'date' => current_time('mysql'),
        'details' => $result['details']
    ];
    update_user_meta($user_id, 'quiz_results', $results);
}
```

### 2. WooCommerce Integration (Paid Readings)
```php
// Add product: "Premium 2026 Reading - ₹99"
function astroquiz_add_to_cart() {
    if (isset($_POST['buy_premium_reading'])) {
        WC()->cart->add_to_cart(123); // Product ID
        wp_redirect(wc_get_cart_url());
    }
}
add_action('init', 'astroquiz_add_to_cart');
```

### 3. Email Collection
```php
// Newsletter signup
function astroquiz_save_email() {
    if (isset($_POST['email'])) {
        $email = sanitize_email($_POST['email']);
        // Save to database or Mailchimp API
        wp_mail($email, 'Welcome to AstroQuiz 2026!', 'Thanks for subscribing...');
    }
}
add_action('wp_ajax_nopriv_astroquiz_email', 'astroquiz_save_email');
```

---

## 🎨 Compatible Themes

### ✅ Best Themes:
1. **GeneratePress** (Fast + Free)
2. **Astra** (Lightweight)
3. **OceanWP** (Feature-rich)
4. **Kadence** (Modern)
5. **Hello (Elementor)** (Minimal)

### ⚠️ Avoid:
- Heavy magazine themes
- Page builders (Divi) without code access

---

## 🔌 Required Plugins

### Essential:
```
1. UpdraftPlus (Backup)
2. Wordfence (Security)
3. WP Super Cache (Speed)
4. Yoast SEO (Search)
```

### Optional:
```
1. WPForms (Email capture)
2. MonsterInsights (Analytics)
3. Social Warfare (Share buttons)
```

---

## 📈 WordPress SEO Setup

### 1. Yoast SEO
```
Install Yoast SEO
Settings:
- Focus Keyword: "2026 प्रेडिक्शन"
- Meta Description: "AI से पता करो..."
- Social Images: result-preview.jpg
```

### 2. Permalinks
```
Settings > Permalinks
Structure: Post name
Example: /2026-love-prediction/
```

### 3. Sitemap
```
Yoast automatically generates sitemap.xml
Submit to Google Search Console
```

---

## 🚀 Performance Optimization

### 1. Caching
```
Install: WP Super Cache
Settings > WP Super Cache:
- Caching: ON
- Preload: ON
- CDN: Cloudflare
```

### 2. Image Optimization
```
Install: Smush
Auto-compress all images
Lazy loading: ON
```

### 3. Database Cleanup
```
Install: WP-Optimize
Schedule weekly cleanup
Remove post revisions
```

---

## 💰 Monetization Plugins

### 1. Ad Inserter
```
Install: Ad Inserter
Block 1: Adsterra Social Bar (Header)
Block 2: Native Ads (Before content)
Block 3: Popunder (Footer)
```

### 2. Advanced Ads
```
Better ad management
A/B testing
Ad rotation
```

---

## 🔔 Push Notification Plugins

### Alternative to OneSignal:
```
1. PushEngage (Premium)
2. OneSignal WP Plugin (Official)
3. Subscribers (Manual)
```

---

## 📱 Mobile App Integration

### Progressive Web App (PWA)
```
Install: Super Progressive Web Apps
Settings:
- App Name: AstroQuiz 2026
- Icon: 512x512 logo
- Offline: Basic
```

Users can "Add to Home Screen"!

---

## 🎯 Next Steps

1. ✅ Install WordPress (या existing site यूज़ करो)
2. ✅ Plugin/Theme integrate करो
3. ✅ Shortcodes पेजेस में ऐड करो
4. ✅ Settings configure करो
5. ✅ Test करो
6. ✅ Launch करो!

---

**💡 Tip:** WordPress साइट पर ट्रैफिक already है? तो conversions 2x faster होंगे! 🚀