import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // 1. Перевіряємо, чи є вже токен у куках
  let cartToken = req.cookies.get('cartToken')?.value;

  // 2. Якщо токена немає — створюємо новий
  if (!cartToken) {
    cartToken = crypto.randomUUID(); // Генеруємо унікальний ID
  }

  // 3. Створюємо відповідь (пропускаємо запит далі)
  const response = NextResponse.next();

  // 4. Записуємо токен у куки користувачу (щоб він зберігся)
  if (!req.cookies.get('cartToken')) {
    response.cookies.set('cartToken', cartToken, {
      path: '/', // Доступний на всіх сторінках
      maxAge: 60 * 60 * 24 * 30, // Живе 30 днів (у секундах)
      sameSite: 'strict',
    });
  }

  return response;
}

// Вказуємо, для яких шляхів спрацьовує middleware
export const config = {
  matcher: [
    /*
     * Застосовуємо до всіх шляхів, ОКРІМ:
     * - api (крім /api/cart, якщо треба, але зазвичай api виключають)
     * - статичних файлів (_next/static, _next/image, favicon.ico)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};