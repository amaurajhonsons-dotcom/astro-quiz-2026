window.OneSignalDeferred = window.OneSignalDeferred || [];

OneSignalDeferred.push(function(OneSignal) {
    OneSignal.init({
        appId: "YOUR_ONESIGNAL_APP_ID",
        safari_web_id: "web.onesignal.auto.xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
        notifyButton: {
            enable: false,
        },
        allowLocalhostAsSecureOrigin: true,
        
        promptOptions: {
            slidedown: {
                enabled: true,
                actionMessage: "हमसे डेली अपडेट्स पाओ!",
                acceptButtonText: "हां!",
                cancelButtonText: "बाद में",
                categories: {
                    tags: [
                        {
                            tag: "daily_predictions",
                            label: "डेली प्रेडिक्शन्स"
                        },
                        {
                            tag: "lucky_tips",
                            label: "लकी टिप्स"
                        }
                    ]
                }
            }
        }
    });
    
    OneSignal.Slidedown.promptPush();
    
    OneSignal.User.PushSubscription.addEventListener('change', function(event) {
        if (event.current.token) {
            console.log('Push subscription token:', event.current.token);
            
            const zodiac = localStorage.getItem('userZodiac') || 'unknown';
            const quizzesTaken = JSON.parse(localStorage.getItem('quizzesTaken') || '[]');
            
            fetch('../api/save-push-subscriber.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    playerId: event.current.token,
                    zodiac: zodiac,
                    quizzesTaken: JSON.stringify(quizzesTaken)
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Subscriber saved:', data);
            });
        }
    });
});

function sendTagsToOneSignal(zodiac, quizId) {
    if (typeof OneSignal !== 'undefined') {
        OneSignal.User.addTags({
            zodiac: zodiac,
            lastQuiz: quizId,
            lastActive: new Date().toISOString()
        });
    }
}