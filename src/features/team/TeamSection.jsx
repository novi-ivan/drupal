import React from 'react'
import teamMember1 from '../../assets/img/team-member-1.jpg'
import teamMember2 from '../../assets/img/team-member-2.jpg'
import teamMember3 from '../../assets/img/team-member-3.jpg'

const teamMembers = [
    {
        id: 1,
        name: 'Лёша',
        role: 'руководитель поддержки, планирование задач',
        image: teamMember1,
    },
    {
        id: 2,
        name: 'Роман',
        role: 'инфраструктура веб-проектов',
        image: teamMember3,
    },
    {
        id: 3,
        name: 'Ирина',
        role: 'менеджер по работе с клиентами, организация оказания услуг',
        image: teamMember2,
    },
    {
        id: 4,
        name: 'Даша',
        role: 'SEO, веб-маркетинг',
        image: teamMember2,
    },
    {
        id: 5,
        name: 'Сергей',
        role: 'технический директор, 14 лет опыт работы с Drupal',
        image: teamMember1,
    },
    {
        id: 6,
        name: 'Вадим',
        role: 'UX/UI дизайн',
        image: teamMember3,
    },
]

export function TeamSection() {
    return (
        <section id="team" className="team">
            <div className="container">
                <h2 className="team__title">Команда</h2>

                <div className="team__grid">
                    {teamMembers.map((member) => (
                        <article key={member.id} className="team-member">
                            <div className="team-member__image-wrapper">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="team-member__image"
                                />
                            </div>
                            <div className="team-member__content">
                                <h3 className="team-member__name">{member.name}</h3>
                                <p className="team-member__role">{member.role}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

