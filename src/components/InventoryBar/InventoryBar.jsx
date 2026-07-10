import React from 'react';
import { useGame } from '../../state/GameContext';
import { ITEMS } from '../../game/items';
import './InventoryBar.css';

export default function InventoryBar() {
  const { state } = useGame();
  const { discoveredItems } = state;

  if (discoveredItems.length === 0) return null;

  const discoveredData = ITEMS.filter(item => discoveredItems.includes(item.id));

  return (
    <div className="inventory-bar">
      <div className="inventory-count">
        {discoveredItems.length} / 18
      </div>
      <div className="inventory-icons">
        {discoveredData.map(item => (
          <span key={item.id} className="inventory-icon" title={item.name}>
            {item.id === 'tie' ? '👔' :
             item.id === 'badge' ? '🪪' :
             item.id === 'glasses' ? '👓' :
             item.id === 'mcdonalds' ? '🍟' :
             item.id === 'biscuit' ? '🍪' :
             item.id === 'mint' ? '🍬' :
             item.id === 'mouseEars' ? '🐭' :
             item.id === 'sleepPills' ? '💊' :
             item.id === 'cufflink' ? '🔗' :
             item.id === 'noodles' ? '🍜' :
             item.id === 'keys' ? '🔑' :
             item.id === 'blanket' ? '🛏️' :
             item.id === 'belt' ? '⛓️' :
             item.id === 'handcuffs' ? '⚙️' :
             item.id === 'recorder' ? '🎙️' :
             item.id === 'rivalFile' ? '📁' :
             item.id === 'mazeDrawing' ? '🗺️' :
             item.id === 'report' ? '📄' : '📦'}
          </span>
        ))}
      </div>
    </div>
  );
}
