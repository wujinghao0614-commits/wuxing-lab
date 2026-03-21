// 确认登出
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.querySelector('a[href="/logout"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            if (!confirm('确定要退出登录吗？')) {
                e.preventDefault();
            }
        });
    }
});
