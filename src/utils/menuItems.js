const menuItemsByRole = {
  'customer': [
    { icon: 'el-icon-goods', title: 'Loja', link: '/loja' },
    { icon: 'el-icon-fa-shopping-cart', title: 'Meu carrinho', link: '/carrinho' },
    { icon: 'el-icon-fa-truck', title: 'Meus pedidos', link: '/minhas-compras' }
  ],
  'manager': [
    { icon: 'el-icon-fa-archive', title: 'Estoque', link: '/estoque' },
    { icon: 'el-icon-fa-pie-chart', title: 'Relatórios', link: '/relatorios' }
  ]
}

export function getMenuItems(roles) {
  if (!roles || !Array.isArray(roles)) return
  const menu = []
  roles.forEach(role => {
    const items = menuItemsByRole[role] || []
    items.forEach(item => menu.push(item))
  })
  return menu
}
