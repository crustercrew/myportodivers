import type { Project } from '../utils/types'

export const projects: Project[] = [
  {
    id: 'aegis',
    name: 'PROJECT: AEGIS',
    description: 'Planetary defense network integration for Core World VII.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAoO54f2cMjKPQQ5H9pxJ5n-b-MEUKM407NgVWoiwAyN5ks8HxDI7LieGva0w1ZVAHx5iW-pu_tysaxb7dZi_fZTCSD_V90y2Sb7I2Dx9h1FkOc6sIPyIvW-zbpvIgiMO59izqAVL6uVE8631wIawwpUJnPuP3IiOjlxZqfiEY7IdU0Kxj6awuLuqr2R7ZRngTjtId1lRKfTlJyHUGw9kniP9QVY5aejZqhKi-0T4GUA6DP_12WuHA5',
    imageAlt: 'Sci-fi dreadnought ship over a volcanic planet',
    status: 'COMPLETED',
    statusColor: 'success',
    metricLabel: 'DATA SYNC',
    metricValue: 100,
    highlighted: false,
  },
  {
    id: 'void-stride',
    name: 'PROJECT: VOID-STRIDE',
    description: 'Sub-space propulsion testing in Sector 0-Negative.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAlr4KWTrrx6PF8NkP8eXSCaUZ2GnFvl7_BxQNVeNflNQiKArSEh2urE5xnnREhaS8_BB5xZ5ZM3lCk4_CfWYzevqhjWKwgxGJaT6dJr8yjQ6KQ-B3LwZyyqRrvH7dJfmP7mZzjpGBnkOmagJ9C29uOeH7Ahvd_stzIiQoD_kqN9kmYmbJ_4ZOFVjS9UEg1dj-UNH4SC1Ney90_SaKvFXWr3GthIqASRChVCjUplvLK-gwtR1eKDZtU',
    imageAlt: 'Glowing digital blueprint of an orbital weapon system',
    status: 'DEPLOYING',
    statusColor: 'primary',
    metricLabel: 'SEQUENCE PHASE',
    metricValue: 64,
    highlighted: true,
  },
  {
    id: 'neon-mind',
    name: 'PROJECT: NEON-MIND',
    description: 'Distributed neural architecture for city-wide logistics.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLx5EhWXBtCmScJxlHGuSGQhkWZWqj6QkrQOxAmijoXFvxMoohmlyrzTNuAfMlc21dNN3D_xcalhTHkQg0_u2pi-JA8S_vuAcF3_lOuebL33puj2z6cXA3Ps8R1NNOXNtBz8Au_rX-iuZwhwHKvFoBScCo5ySWiCAeFfKQYlfjsExF_zYdYDhesk1GqWOM86cmf-v2-qsAoIwZqPfzFW_fy5jt-gT-lUbF54cYKcoGoxtmV-Xui0lo',
    imageAlt: 'Neon-lit cyberpunk metropolis under heavy rain',
    status: 'COMPLETED',
    statusColor: 'success',
    metricLabel: 'UPTIME STATUS',
    metricValue: 99.9,
    highlighted: false,
  },
]
