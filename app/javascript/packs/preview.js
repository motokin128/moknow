$(document).on('turbolinks:load', function(){
    $(function(){
        const dataBox = new DataTransfer();
        const fileField = document.querySelector('input[id=user_avatar]');
        // 【プロフィール画像プレビュー】
        function avatarPreview(avatar){
            const fileReader = new FileReader();
            if ($('.avatar-preview').length ) {
                if ($('#current-avatar-image').length) $('.avatar-label').prepend('<input type="hidden" name="user[avatar]" value="">')
                dataBox.clearData();
                $('.avatar-preview, .delete-preview').remove();
            }
            dataBox.items.add(avatar)
            fileReader.onloadend = function(){
                const avatarImage = `<img src="${fileReader.result}" class="rounded-circle avatar-preview bg-light">`;
                const deleteButton = '<button type="button" class="btn btn-gray btn-sm rounded-circle delete-preview"><i class="fas fa-times"></i></button>';
                $('.avatar-label').prepend(avatarImage).after(deleteButton);
            };
            fileReader.readAsDataURL(avatar);
        }
        // 【プロフィール画像選択】
        $('.avatar-image-field').on('change', function(){
            if ($(this).val()) {
                const avatar = $(this).prop('files')[0];
                avatarPreview(avatar);
            } else {
                fileField.files = dataBox.files
            }
        });
        // 【プロフィール画像削除】
        $('.avatar-container').on('click', '.delete-preview', function(){
            if($('.avatar-image-field').val()){
                dataBox.clearData();
                fileField.files = dataBox.files
            } else {
                $('.avatar-label').prepend('<input type="hidden" name="user[avatar]" value="">');
            }
            $('.avatar-preview, .delete-preview').remove();
        });
        // 【プロフィール画像ドロップ機能】
        if (document.querySelector('.avatar-label')) {
            const avatarDropArea = document.querySelector('.avatar-label');
            avatarDropArea.addEventListener("dragover", function(e){
                e.preventDefault();
                $(this).css({'background-color': '#9e9e9e', 'opacity': '0.5'});
            },false);
            avatarDropArea.addEventListener("dragleave", function(e){
                e.preventDefault();
                $(this).css('opacity', '1.0').addClass('bg-light');
            },false);
            avatarDropArea.addEventListener("drop", function(e) {
                e.preventDefault();
                $(this).css('opacity', '1.0').addClass('bg-light');
                const avatar = e.dataTransfer.files[0];
                avatarPreview(avatar);
            });
        }
    });
});
