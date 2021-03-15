package com.jojoldu.book.springboot.config.auth;

import com.jojoldu.book.springboot.domain.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomOAuth2UserService customOAuth2UserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.csrf().disable().headers().frameOptions().disable() /* h2-console 화면을 사용하기 위해 해당 옵션을 disable */
                .and()
                .authorizeRequests() /* URL 별 권환 관리설정 옵션 시작점 */
                .antMatchers("/", "/css/**", "/images/**", "/js/**", "/h2-console/**") /* URL, HTTP 메소드별 권한 관리 대상을 지정하는 옵션 */
                .permitAll() /* 전체 열람 권한 */
                .antMatchers("/api/v1/**")
                .hasRole(Role.USER.name()) /* USER 권한을 가진사람만 가능 */
                .anyRequest() /* 나머지 URL */
                .authenticated() /* 인증된 사용자에게만 허용 */
                .and()
                .logout().logoutSuccessUrl("/") /* Logout 기능에 대한 여러 설정의 진입점, 로그아웃 성공 시 / 주소로 이동 */
                .and()
                .oauth2Login() /* OAuth 2 로그인 기능에 대한 여러 설정의 진입점 */
                .userInfoEndpoint() /* OAuth 2 로그인 성공 이후 사용자 정보를 가져오는 설정 */
                .userService(customOAuth2UserService); /* 로그인 성공 시 후속 조치 */
    }
}
