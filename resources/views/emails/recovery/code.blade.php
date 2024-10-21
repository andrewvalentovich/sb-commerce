<h1>Восстановление пароля</h1>

<p>Данные клиента:</p>
<ul>
    @if(isset($data['code'])) <li>Код восстановления: {{ $data['code'] }}</li>@endif
    @if(isset($data['code_expire'])) <li>Код действителен до: {{ $data['code_expire'] }}</li>@endif
</ul>
